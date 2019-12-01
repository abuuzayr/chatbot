/*
 * HOW TO USE THIS LOADER FILE
 * ===========================
 *
 * Drop this script on the required page with the following configurations:
 * - id: this ID must remain as chatbot-load-script
 * - country (required): [country]/[language] e.g. hk/zh
 * - test (defaults to false): true / false (if true, url loaded will be from preview website)
 * - use-grunticon (defaults to false): to use grunticon to load icons or to use paths to images
 *
 * Example usage:
 *
 * <script src="https://av.sc.com/assets/global/chatbot/loader.js"
 *  type="text/javascript"
 *  id="chatbot-load-script"
 *  data-country="hk/zh"
 *  data-test="true"
 *  data-use-grunticon="false"
 *  data-title="Stacy"
 *  data-subtitle="Stacy"
 *  data-avatar-icon-name="icon-sc-chatbot-avatar"
 *  data-greeting-name="animated-avatar.gif"
 *  data-close-chat-icon-name="icon-sc-close-chat">
 * </script>
 * 
 * To customise the chatbot further, these are the options:
 * - title (optional): title of chatbot - for header & greeting
 * - subtitle (optional): subtitle of chatbot - for header & greeting
 * - avatar-icon-name (optional): icon name of chatbot avatar
 * - greeting-name (optional): filename of greeting icon
 * - close-chat-icon-name (optional): close chat icon name
 * 
 * Drop the following code on the page but it must be after loading the script above:
 * 
 * <div class="m-click-to-chat chatbot"
 *  data-chatbot-title="Stacy"
 *  data-chatbot-subtitle="Typically replies instantly"
 *  data-chatbot-avatar-icon-name="icon-sc-chatbot-avatar-round"
 *  data-chatbot-greeting-name="animated-avatar.gif"
 *  data-chatbot-close-chat-icon-name="icon-sc-close-chatbot">
 * </div>
 *
*/

let chatbotLoader = document.getElementById('chatbot-load-script');

// catch errors

if (chatbotLoader) {
  // get variables from loader script

  let country = chatbotLoader.getAttribute('data-country'),
    test = chatbotLoader.getAttribute('data-test'),
    useGrunticon = chatbotLoader.getAttribute('data-use-grunticon'),
    urlHead = 'https://preview.standardchartered.com',
    chatbotUrl = '/assets/global/chatbot/';

  if (test != 'true') {
    urlHead = 'https://av.sc.com';
  }

  chatbotUrl = urlHead + chatbotUrl + country;

  // build chatbot components

  let chatbotDiv = document.querySelectorAll('.m-click-to-chat.chatbot');
  if (chatbotDiv.length == 0) {
    chatbotDiv = document.createElement('div');
    chatbotDiv.className = 'm-click-to-chat chatbot';
    document.body.appendChild(chatbotDiv);
  } else {
    chatbotDiv = chatbotDiv[0];
  }
  chatbotDiv.setAttribute('data-chatbot-url', chatbotUrl);

  // add required scripts

  let chatbotClassScript = '';

  // GRUNT: ADD CHATBOT CLASS BELOW ===
  // G:ACCB

  let chatbotClass = document.createElement('script');
  chatbotClass.type = 'text/javascript';
  chatbotClass.innerText = chatbotClassScript;
  document.getElementsByTagName('head')[0].appendChild(chatbotClass); // for IE6

  let chatbotInitScript = String(
    [
      'let chatbot = new Chatbot;',
      'chatbot.setChatbotOptions();',
      'chatbot.testMode = ' + test + ';',
      'chatbot.useGrunticon = ' + useGrunticon + ';',
      'chatbot.generateChatbotElements(chatbot.chatbotOptions, true);'
    ].join('')
  );

  let chatbotInit = document.createElement('script');
  chatbotInit.type = 'text/javascript';
  chatbotInit.innerText = chatbotInitScript;
  document.getElementsByTagName('head')[0].appendChild(chatbotInit); // for IE6

  // add required styles

  let chatbotStyles = '';

  // GRUNT: ADD CHATBOT STYLES BELOW ===
  // G:ACSB

  chatbotStyles += '.chatbot-icon-wrapper{position:fixed;bottom:30px;right:30px;z-index:99999;}';
  let css = document.createElement('style');
  css.innerText = chatbotStyles;
  document.getElementsByTagName('head')[0].appendChild(css); // for IE6
} else {
  console.error('No chatbot loader element found. Check that the chatbot-load-script ID is set.');
}
