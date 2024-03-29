/**
 * @file Base functions to run after all dependencies are loaded.
 * @author Standard Chartered Bank Limited
 */

/* globals 
  $jq,
  OverlayScrollbars, 
  kai, 
  autosizer, 
  getLocation,
  addGoogleAnalytics,
  parentUrl,
  ping,
  paramsToObject,
  paramsToStr,
  openLivebank,
  defaultBotParams,
  iconUrls,
  bowser,
  logoutUser,
  langConfig
*/

(function($) {
  /**
   * Load Google maps and related libraries
   */
  var gMapsUrl =
      'https://maps.google.com/maps/api/js?client=gme-standardchartered&libraries=places',
    lang = document.documentElement.lang;
  if (lang) gMapsUrl += '&language=' + lang;
  // get map region & append to maps URL
  var locationArr = location.href.split('/');
  var region =
    locationArr.indexOf('chatbot') > -1 ? locationArr[locationArr.indexOf('chatbot') + 1] : null;
  if (region) gMapsUrl += '&region=' + region.toUpperCase();
  // load Google Maps library and location picker parts if google is accessible
  $.getScript(gMapsUrl, function() {
    $.getScript('../../scripts/locationpicker.min.js', function() {
      // attempt to update the default location
      toGetLocation = true;
    });
  });
  /**
   * Load all modules and run successive functions
   */
  $.getScript('../../scripts/modules.min.js', function() {
    // Upgrade scrollbars to UI/UX team requirements
    // Github repo: https://github.com/KingSora/OverlayScrollbars
    // Support: IE8+, Safari6+, Firefox, Opera, Chrome and Edge
    OverlayScrollbars(document.querySelectorAll('.tnc-content'), {
      scrollbars: {
        autoHide: 'move'
      }
    });
    OverlayScrollbars(document.querySelectorAll('.kai-chat-content-wrapper-2'), {
      scrollbars: {
        autoHide: 'move'
      },
      callbacks: {
        onInitialized: function() {
          this.scroll({ y: '100%' });
        },
        onContentSizeChanged: function() {
          debounce(this.scroll({ y: '100%' }, 250));
          var target = this.getElements().target;
          checkToResizeImages(target);
          checkForSingleCardCarousel(target);
          removeEmptyCarousel(target, '.kai-carousel', '.kai-carousel-content');
          removeEmptyCarousel(target, '.kai-quick-replies', '.kai-quick-replies-container');
        },
        onHostSizeChanged: function() {
          debounce(this.scroll({ y: '100%' }, 250));
        }
      },
      overflowBehavior: {
        x: 'hidden'
      }
    });

    var inputPrompt = $('.kai-input-prompt');

    // disable input prompt if Kai is not started
    inputPrompt.attr('disabled', 'disabled');

    /**
     * See #1597 - Text input height to increase upon input
     * Autosizer repo: https://github.com/jackmoore/autosize
     */
    inputPrompt.attr('rows', 1);
    autosizer(inputPrompt);

    /**
     * Detect message submission events to resize the textbox.
     * Input should resize to single row when message sent
     */
    $('.kai-send-message-button').on('click', updateTextareaSize); // onclick of submit button
    inputPrompt.keyup(function(e) {
      if ((e.keyCode || e.which) == 13) {
        // on enter key on text input
        updateTextareaSize();
      }
    });

    /**
     * Add event listener to activate/deactivate submit button.
     * The event listener in Kai webview listens to keypress only.
     * See: #2087
     */
    $(inputPrompt).on('keyup', function(e) {
      if ($(this).val().length > 0) {
        //Remove button disable class
        $('.kai-send-message-button').removeClass('disable');
      } else {
        $('.kai-send-message-button').addClass('disable');
      }
    });

    /**
     * Add event listener to detect if innerheight is changed - for iOS quirk
     * See: #2131
     */

    inputPrompt.click(function() {
      if (window.matchMedia('(max-width: 480px)')) {
        window.top.postMessage({ startResizeLoop: true }, '*');
      }
    });

    /**
     * disable touch scroll for bottom element
     * See: #2131
     */
    $('.kai-input-message').on('touchmove', function(e) {
      e.preventDefault();
    });

    /**
     * Hide the placeholder if the textbox is in focus
     * See: #1863
     */
    var placeholder = inputPrompt.attr('placeholder');
    inputPrompt.focus(function() {
      inputPrompt.attr('placeholder', '');
    });
    inputPrompt.focusout(function() {
      inputPrompt.attr('placeholder', placeholder);
      window.top.postMessage({ stopResizeLoop: true }, '*');
    });

    /**
     * Start the Kai session
     * Launch Terms and Conditions prompt if no active session found
     */
    var activeSession = kai.getUserContext().session_id || false;
    if (!activeSession) {
      $('.tnc')
        .css({ opacity: 0.0, visibility: 'visible' })
        .animate({ opacity: 1.0 });
      $('[data-lang="' + lang + '"]').addClass('active');
    } else {
      startKai(true);
    }

    // Here is the end of the loading of all scripts for chatbot.
    // Ping is run here so that we can display maintenance page
    // early for the user in case of bot down.
    ping();
  });

  /**
   * Hide the preloader gif since this file is run after
   * modules.min.js is loaded.
   */
  $('.preloader')
    .css({ opacity: 1.0, visibility: 'visible' })
    .animate({ opacity: 0.0 })
    .detach();

  /**
   * If on mobile, there will be no trigger to open the chatbot,
   * therefore script will be added automatically on load.
   * @todo: remove _chatbotLoad when mobile 2.0 is updated.
   */
  if (!parentUrl && window._chatbotLoad) {
    addGoogleAnalytics();
  }

  /**
   * Enable input prompt and focus if on desktop.
   */
  function enableTextFocus() {
    // Enable text input
    $('.kai-persistent-menu .kai-input-prompt').removeAttr('disabled');
    // Focus on text input if on desktop
    if (!(bowser.mobile || bowser.tablet)) {
      $('.kai-persistent-menu .kai-input-prompt').focus();
    }
  }

  /**
   * Run chatbot start session sequence.
   *
   * @param {boolean} activeSession - Whether there is an existing session
   */
  function startKai(activeSession) {
    // Confirm that Google Analytics script is present and add if it is not
    addGoogleAnalytics();
    enableTextFocus();
    // Bring chatbot window into view
    $('.kai-wrap')
      .css({ opacity: 0.0, visibility: 'visible' })
      .animate({ opacity: 1.0 });
    // T & C animations
    // Animate the removal of terms & conditions div if no active session
    if (activeSession) {
      $('.tnc').detach();
    } else {
      $('.tnc')
        .css({ opacity: 1.0, visibility: 'visible' })
        .animate({ opacity: 0.0 })
        .detach();
    }
    // Remove active class from current lang
    window.top.postMessage({ applyLang: lang }, '*');
    // Greeting avatar images
    if (iconUrls.greeting && '' !== iconUrls.greeting) {
      var greetingAvatarHtml = $('<img src="null" class="greeting-avatar"/>');
      $('.kai-screen-intro').html(greetingAvatarHtml);
      greetingAvatarHtml
        .each(function() {
          this.offsetHeight;
        })
        .attr('src', iconUrls.greeting);
    }
    /**
     * Run chatbot start animation sequence.
     * 1. Gif animation appears
     * 2. titleDelay + Title appears
     * 3. subtitleDelay + Subtitle appears
     * 4. startSessionDelay + Display conversation starters
     * 5. No delays if there is an existing session.
     */
    var startSessionDelay = 0,
      subtitleDelay = 500,
      titleDelay = 1000;
    setTimeout(function() {
      var title = findGetParameter('title') || defaultBotParams['title'] || 'Stacy',
        titleHTML = $(
          '<h1 style="opacity:0;margin-top:10px;margin-bottom:-10px;">' + title + '</h1>'
        );
      if (title) {
        $('.kai-screen-intro').append(titleHTML);
        $('.chat-title').text(title);
      }
      if (activeSession) {
        titleHTML.css({ opacity: 1, 'margin-top': '0' });
      } else {
        titleHTML.animate({ opacity: 1, 'margin-top': '0' });
      }
      setTimeout(function() {
        var subtitle =
            findGetParameter('subtitle') ||
            defaultBotParams['subtitle'] ||
            'Typically replies instantly',
          subtitleHTML = $('<p style="opacity:0;margin-top:10px;">' + subtitle + '</p>');
        if (subtitle) $('.kai-screen-intro').append(subtitleHTML);
        if (activeSession) {
          subtitleHTML.css({ opacity: 1, 'margin-top': '0' });
        } else {
          subtitleHTML.animate({ opacity: 1, 'margin-top': '0' });
        }
        setTimeout(function() {
          if (!activeSession) {
            kai.sendStartSessionEvent(function(response) {
              kai.renderJsonResponse(response);
              enableTextFocus();
            });
          }
        }, startSessionDelay);
      }, activeSession ? 0 : subtitleDelay);
    }, activeSession ? 0 : titleDelay);
  }

  /**
   * On click event listeners.
   */
  $('.tnc-agree').on('click', function() {
    startKai(false);
  });

  $('.livebank').on('click', function() {
    openLivebank();
  });

  $('.reload').on('click', function() {
    ping();
  });

  $('.lang-switch .lang').on('click', function(e) {
    window.top.postMessage(
      {
        langClickEvent: e.target.getAttribute('data-lang'),
        showModal: 0 === $(this).parents('.tnc').length
      },
      '*'
    );
  });

  $('.logout-btn').on('click', function() {
    logoutUser();
  });
  $('#loginModal button.close').on('click', function() {
    var closeMessage = 'Feel free to ask me other questions.';
    if (langConfig && langConfig.hasOwnProperty('cancelLoginMsg')) {
      closeMessage = langConfig.cancelLoginMsg;
    }
    mockKaiResponse(closeMessage);
  });
  // window unload event handler
  window.addEventListener('unload', function() {
    // logout session if authenticated
    kai.sendGenericEvent('LOGOUT', []);
    // delete kai session cookie - no library used here
    document.cookie = 'k_session_id' + '=;path=/;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  });

  /**
   * Update the input box to the right size.
   */
  function updateTextareaSize() {
    autosizer.update($('.kai-input-prompt'));
  }

  /**
   * Standard debounce function in Vanilla JS
   * Read: https://davidwalsh.name/javascript-debounce-function
   *
   * Returns a function, that, as long as it continues to be invoked, will not
   * be triggered. The function will be called after it stops being called for
   * N milliseconds. If `immediate` is passed, trigger the function on the
   * leading edge, instead of the trailing.
   *
   * @param {Function} func - the function to debounce
   * @param {integer} wait - time to bounce
   * @param {boolean} immediate - func should be run immediately
   *
   * @returns {Function} - see description above
   *
   */
  function debounce(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this,
        args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  }

  /**
   * Override google maps image src url generated from kai.
   * Checks the element for map carousels and updates the
   * background img src with an updated url, or for
   * transaction overview carousels to add the
   * transactions class to the parent.
   *
   * @param {string} element - The element to parse.
   */
  function checkToResizeImages(element) {
    var mapsApiUrl = 'https://maps.googleapis.com/maps/api/staticmap';
    var imgApiUrl = 'https://snapshot.kitsys.net';
    $.each($(element).find('.kai-carousel'), function(key, value) {
      var cImg = $(value).find('.kai-carousel-item.slide .kai-image div.img-src');
      $.each(cImg, function(keyA, valueA) {
        var imgUrl = $(valueA).text();
        if (imgUrl) {
          if (imgUrl.indexOf(mapsApiUrl) > -1) {
            var mapParams = paramsToObject(imgUrl);
            mapParams.region = 'hk';
            mapParams.size = '250x150';
            mapParams.center = mapParams.markers ? mapParams.markers.split('%7C')[1] : '';
            imgUrl = mapsApiUrl + '?';
            imgUrl += paramsToStr(mapParams);
            $(valueA).text(imgUrl);
          } else if (imgUrl.indexOf(imgApiUrl) > -1) {
            $(value).addClass('transaction-carousel');
          }
          $(valueA).before($('<img draggable="false">').attr('src', $(valueA).text()));
          $(valueA).remove();
        }
      });
    });
  }

  /**
   * Checks the element for single card carousels and
   * removes empty kai-text divs in them.
   *
   * @param {string} element - The element to parse.
   */
  function checkForSingleCardCarousel(element) {
    $.each($(element).find('.kai-carousel.single-card'), function(key, value) {
      var kaiText = $(value).find('.kai-text');
      if ($.trim(kaiText.text()).length === 0) {
        kaiText.detach();
      }
    });
  }

  /**
   * Checks the element for empty carousels and removes them
   *
   * @param {string} element - The element to parse.
   * @param {string} parent - The parent carousel class to search.
   * @param {string} children - The class of the container holding children.
   */
  function removeEmptyCarousel(element, parent, children) {
    $.each($(element).find(parent), function(key, value) {
      if (
        $(value)
          .find(children)
          .children().length === 0
      ) {
        if (!$(value).hasClass('single-card')) {
          $(value).detach();
        }
      }
    });
  }

  /**
   * Mock a Kai engine response
   *
   * @param {string} msg - The message to display.
   */
  function mockKaiResponse(msg) {
    kai.renderJsonResponse({
      message_contents: [
        {
          type: 'TEXT',
          payload: {
            text: msg
          }
        }
      ]
    });
  }
})($jq);
