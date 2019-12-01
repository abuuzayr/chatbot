# Chatbot

This repository is the directory for assets related to the deployment of an AI-driven chatbot for a financial services platform.

### Directory structure

```
chatbot
│   countries.json
│   Gruntfile.js   
│   loader.js   
│   package.json
│
└───src
│   └───base
│   │   │   base.html
│   │   │   livechat.html
│   │   │
│   │   └───css
│   │   │   │   *.css
│   │   │
│   │   └───icons
│   │   │   │   *.svg
│   │   │   │
│   │   │   └───twemoji
│   │   │   │   │  *.png
│   │   │
│   │   └───images
│   │   │   │   *.png / *.gif / *.jpg
│   │   │
│   │   └───js
│   │   │   │   base.js
│   │   │   │   env.js
│   │   │
│   │   │   └───external
│   │   │   │   │    *.js
│   │   │
│   │   └───scss
│   │   │   │   *.scss
│   │   │
│   └───modules
│   │   └───active
│   │   │   │   *.html / *.scss / *.js
│   │   │
│   │   └───inactive
│   │   │   │   *.html / *.scss / *.js
│   │
│   └───templates
│   │   │   *.handlebars / *.js
│   │
│   └───vendor
│   │   │   webview-library.js
│   │   │   webview-library.css
│   │   └───images
│   │   │   │   *.png / *.gif / *.jpg
│
```

# `/chatbot`

```
│   countries.json
```

Define engine endpoints for countries and their respective languages for each environment. Also for defining country specific default values for parsing by `grunt`.

```
│   Gruntfile.js   
```

Define grunt tasks for the chatbot only.

```
│   loader.js   
```

Skeleton for loader script to deploy chatbot via a drop in script. This file will be parsed by grunt to create the final loader.js script.

```
│   package.json
```

Package metadata only for this chatbot subdirectory.

## `/chatbot/src`

```
└───src
```

Source files for chatbot are located here.

### `/chatbot/src/base`

```
└───src
│   └───base
```

Base source files for chatbot are located here.

```
│   │   │   base.html
```

`base.html` is the base file for the HTML markup for chatbot. It is from this file that grunt takes to produce `index.html` and `mobile.html` in the respective country folders. This file includes HTML markup for chatbot as well as critical scripts that need to load first before the markup is rendered. 

```
│   │   │   livechat.html
```

`livechat.html` is the file that will be called upon to connect to livebank via a POST request. It contains a form that is populated by values from URL query parameters which automatically then sents a POST request to a livebank URL to connect the user to livebank.

#### `/chatbot/src/base/css`

```
└───src
│   └───base
│   │   └───css
│   │   │   │   *.css
```

This directory contains css files that chatbot depends on. SCSS is used in favour of CSS so this directory is usually untouched. `base.css` however is also picked up by grunt and merged into `main.min.css` which is loaded by the chatbot. 

#### `/chatbot/src/base/icons`

```
└───src
│   └───base
│   │   └───icons
│   │   │   │   *.svg
```

This directory contains icons used by the chatbot. The icons in the base folder are picked up by grunticon to produce grunticon icons, and the icons in the `twemoji` folder are copied and mapped to each country folder. 

##### `/chatbot/src/base/icons/twemoji`

```
└───src
│   └───base
│   │   └───icons
│   │   │   └───twemoji
│   │   │   │   │  *.png
```

The icons in this folder are copied and mapped to each country folder (e.g. `.../hk/en/images/twemoji/72x72`). The reason for this is that the vendor includes and depends on `twemoji` icons in their responses, and the URL to these icons are relative paths to the directory from which the chatbot is served (`./images/twemoji/72x72/..`). As we are unable to change these paths, we have to include them in every directory.

Currently we only use two icons: `2122.png` and `ae.png` but if they use more in future, just add the required icons into this folder.

#### `/chatbot/src/base/images`

```
└───src
│   └───base
│   │   └───images
│   │   │   │   *.png / *.gif / *.jpg
```

All the images that are used by the chatbot are included here. They will be copied to the `images` folder in the distribution folder. 

#### `/chatbot/src/base/js`

```
└───src
│   └───base
│   │   └───js
```

This folder contains all JavaScript source files for this project.

```
│   │   │   │   base.js
```

`base.js` contains code that is intended to run after all the project dependencies have been loaded. This file is only loaded after `deps.min.js` and `modules.min.js`, so it may include functions that invoke automatically when this file is loaded. 

```
│   │   │   │   env.js
```

This is the base environment file that grunt will pick up and use as the foundation to build `env.js` files in every country folder. 

#### `/chatbot/src/base/js/external`

```
└───src
│   └───base
│   │   └───js
│   │   │   └───external
│   │   │   │   │    *.js
```

This folder contains all external dependencies that are used by the chatbot team. These files are copied directly from the source libraries and included here so as to remove dependencies on CDNs and to maintain the version numbers. Only minified versions should be included here to reduce the repository size. 

#### `/chatbot/src/base/scss`

```
└───src
│   └───base
│   │   └───scss
│   │   │   │   *.scss
```

This directory stores all the `scss` files for this repository. Only `base.scss` is picked up by grunt, so `base.scss` imports all the modules that are used by the project. Do keep the code modular and module names self explanatory.

### `/chatbot/src/modules`

```
└───src
│   └───modules
│   │   └───active
│   │   └───inactive
```

This directory is to store optional modules that are used by the chatbot. The idea was to keep the code modular and easily activate or deactivate modules for immediate or future use. Module folders contain only `.html`, `.js` and `.scss` files. Other files are ignored and not compiled into the distribution build. 

`.html` files are inserted into `base.html` via grunt `htmlbuild`, `.js` files are concatenated into `modules.min.js` and `.scss` files are imported by `modules.scss` and parsed to `modules.min.css`.

```
│   │   │   │   modules.scss
```

For module stylesheets, only `modules.scss` is picked up by grunt, so `modules.scss` has to import `.scss` files from active module folders that are used by the project.

### `/chatbot/src/templates`

```
└───src
│   └───templates
│   │   │   *.handlebars / *.js
```

In this folder, there are handlebars templates with the `.handlebars` extension and helper functions with `.js` extensions. There are grunt tasks provisioned to convert `.handlebars` files and helper `.js` files into a single `templates.min.js` file that can be fed to the Handlebars compiler. More info here: [Overriding templates](Chatbot/Overriding-templates)

### `/chatbot/src/vendor`

```
└───src
│   └───vendor
│   │   │   webview-library.js
│   │   │   webview-library.css
│   │   └───images
│   │   │   │   *.png / *.gif / *.jpg
```

This folder is for relevant webview files that are used by the chatbot. The files here are to be dropped in and replaced in event of any update. No changes are to be made by developers in these files.

### Overriding templates

There is a functionality in the webview that allows us to override their templates for some element blocks. 

These element templates can be overriden:

- card
- list
- carousel
- alternative_questions
- button
- typing

The templates files are located in `src/templates`. In this folder, there are handlebars templates with the `.handlebars` extension and helper functions with `.js` extensions. There are grunt tasks provisioned to convert `.handlebars` files and helper `.js` files into a single `templates.min.js` file that can be fed to the Handlebars compiler. These tasks will be run upon running `grunt serve` or `grunt prod`.

To enable overriding on any template, add the name of the template to the `customTemplateNames` array as a string. For example, if we wish to override the **card** and **list** templates, we would set the array like so:

```JavaScript
var customTemplateNames = ['card', 'list'];
```

The full function to activate templating:

```JavaScript
/* Load custom Handlebars template from /templates folder
    These are the names of templates you can overwrite
    'card', 'list', 'carousel', 'alternative_questions', 'button'
*/

function importCustomHandlebarTemplates(callback) {
    var customTemplateNames = [];
    var customTemplates = [];
    var requests = [];
    function loadCustomHandlebarTemplateFile(templateName) {
        var templateToRetrieve = 'customTemplate' + templateName.substr(0, 1).toUpperCase() + templateName.substr(1);
        var templateData = Handlebars.compile(eval(templateToRetrieve));
        if (templateData) {
            customTemplates[templateName] = { template: templateData };
        }
    }

    $.each(customTemplateNames, function(key, value) {
        requests.push(loadCustomHandlebarTemplateFile(value));
    });

    $.when.apply($, requests).done( function(schemas) {
        callback(customTemplates);
    });
}

// Use importCustomHandlebarTemplates to import all handlebar templates
// then load the Webview Library
importCustomHandlebarTemplates( function(customTemplates) {
    kai = new Kai({
        // ...other init options...
        customHandlebarTemplates: customTemplates,
        // ...other init options...
    });
    kai.init();
});
```

The templates files are located in `src/assets/js/modules/chatbot/templates` and currently contain the default templates for the abovementioned available templates as Handlebars files:

- `alternative_questions.handlebars`
- `button.handlebars`
- `card.handlebars`
- `carousel.handlebars`
- `list.handlebars`
- `typing.handlebars`

Also included are helper files that are used in these templates. More on Handlebars helpers: https://handlebarsjs.com/block_helpers.html

- `breaklines.js`

Replaces newlines in the text with `<br>` breaklines.

- `compare.js`

Pass in two values that you want and specify what the operator should be

e.g. `{{#compare val1 val2 operator="=="}}{{/compare}}`

- `slice.js`

Iterate over a specific portion of a list. 

e.g. `{{#slice items offset="1" limit="5"}}{{name}}{{/slice}}` : items 1 thru 6

### Grunt tasks for chatbot

Here are the grunt tasks that you can run to generate the files required to develop or deploy chatbot. 

# `grunt chatbot-serve` :star:

This command needs to be run in the chatbot directory: `src/assets/js/modules/chatbot`

This is for serving files for local development. `grunt chatbot-serve` will run a series of tasks to compile files and serve them to `http://localhost:8448` as well as watch for file changes in the source directory. Any changes to `.html`, `.js`, `.scss`, `.handlebars`, `.css` as well as the configuration in `countries.json` will automatically re-compile the required files and refresh any chatbot windows that are open. 

# `grunt chatbot-prod`

This command needs to be run in the chatbot directory: `src/assets/js/modules/chatbot`

This task is to compile and generate files for production. This is the actual task that is run in production to build the necessary files for chatbot by Travis CI. This command can be run in the local environment in order to troubleshoot for any build or compilation errors. 

The developer can choose to run `grunt prod` and serve these production assets locally via a script like [SimpleHTTPServer](https://docs.python.org/2/library/simplehttpserver.html), a web server like [Caddy](https://caddyserver.com/) or services such as [ngrok](https://ngrok.com/) & [serveo](http://serveo.net/).

# `grunt serve` :star:

This command needs to be run in the base directory.

This command will run a series of tasks that will compile and serve assets to https://localhost:8443, and also serve dummy template files that will be used for testing of modules in the local environment before being merged to the main repository 

With regards to chatbot, the chatbot icon has been included in the country landing page template located at https://localhost:8443/page-country-landing.html. The parameters for chatbot for the template are managed in `/src/_includes/modules/click-to-chat/click-to-chat__chatbot.html`. The parameters included in this file are exactly the parameters that are generated when the chatbot is managed via *php* in the CMS.

The behaviour of chatbot on this country landing page mimics the behaviour on the preview and production environments - the chatbot loaded in an iframed window. There are caveats to this approach, however, and these caveats and complexities are addressed here: [Enable HTTPS for localhost (for iFraming)](Chatbot/Enable-HTTPS-for-localhost)

# `grunt prod`

This command needs to be run in the base directory.

This task is to compile and generate files for production for the entire webmaster assets repository . This is the actual task that is run in production to build the necessary files for the production and preview environments by Travis CI, which includes chatbot as well. This command can be run in the local environment in order to troubleshoot for any build or compilation errors. 

### Setting up standalone chatbot directory

Although the chatbot code sits within the entire webmaster assets repository, the chatbot code can run as a standalone application without dependency on the outer repository. 

These instructions assume you already have `node` and `npm` installed. 

Clone and navigate
------------------

After cloning this repository, navigate to the chatbot directory

```
$ cd src/assets/js/modules/chatbot
```

Install dependencies
--------------------

#### 1. install `grunt`

```
$ npm install -g grunt
```

or if you wish to install only locally to this project

```
$ npm install --save-dev grunt
```

#### 2. install project dependencies

```
$ npm install
```

#### 3. install missing dependencies otherwise installed by the outer repository

```
$ npm install --save-dev postcss-preset-env jit-grunt grunt-postcss
```

That's all :boom: 

You should be able to run `grunt chatbot-serve` now. 

### Bot down scenario handling

The chatbot has a mechanism to check if the chatbot engine is reachable and to display a maintenance page if it is not. There is a `GET` endpoint for this purpose, `/ping` which is appended to the engine URL: `{{ENGINE URL}}/ping`. Since this is a `GET` endpoint, you can paste this link in the browser and get a status response with a body like:

```
{
  "status" : "OK",
  "debug_message" : "",
  "accept_chat" : true,
  "version_info" : {
    ...
  }
}
```

The maintenance page looks like: 

![maintenance](https://pli.io/o3Vkq.md.png)

This maintenance page will only appear on loading the chatbot. It will not appear during a conversation. 

Maintenance actions
-------------------

There are some things the user can do when presented with the maintenance page. They can either:

#### 1. Chat with a live agent

The parameters forwarded to Livebank in this scenario will be without context, without an exchange token and will be default values defined in `config.json`. In `config.json`, there are two parameters that are configurable

- livebank URL (`translations['serverErrorButtonUrl']`)
- livebank profile (`livebankProfile`) 

`subjectId` will default to `DEFAULT` and `workGroup` will be undefined as it is not a required parameter for connecting to livebank. 

#### 2. Contact Stacy again

This action will just run `ping()` again, which, if the engine becomes reachable, will hide the maintenance overlay and present the chatbot to the user. A full reload of the page is not required. 

ping.js
-------

The current implementation of this mechanism is located in `ping.js` in the modules folder: `/src/modules/active/ping/ping.js` and called by simply `ping()`. The function does a jQuery AJAX request to the endpoint and expects the response to have a `status` key and value as `OK` in its body. If any of the below requirements are met, the maintenance page is displayed. 

- status is other than OK
- URL is unreachable
- response takes more than the `responseTimeout` declared in the `kai` object in seconds
- AJAX call is unsuccessful for any reason

### Upgrading the chatbot assets version

We employ an assets versioning method to ensure that when new assets are deployed, they would be requesting the updated version from the CDN and not have to wait for the CDN, browser or network cache to clear.

Since chatbot files are not handled or requested by the parent repository (which have their own versioning), the assets version is handled manually by the grunt build. 

To upgrade the version, go to `src/assets/js/modules/chatbot/Gruntfile.js` and somewhere on the top of the file you will see:

```
global['ASSET_VERSION'] = 'x.xx';
```

Increment the current version using [Semantic Versioning](https://semver.org/).

The grunt build will take care of the rest. 

### Drop in loader script

The `loader.js` script was created for cases where chatbot would require to be deployed outside of the main website pages. Since the code for building and configuring the chatbot is hosted with the CMS code, other departments would not have access to do so therefore this script was made. 

### Automated process

The `loader.js` file is a by-product of the grunt build and can be found in the base folder of the chatbot assets.

The grunt build will build the required chatbot elements (the Chatbot class and chatbot styles for the parent container) and insert them inline into `loader.js`. 

### How to use

The instructions on how to use the file are in the script itself, as a comment on the top of the script. 

```
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
 * <script src="{{ URL TO LOADER.JS SCRIPT }}"
 *  type="text/javascript"
 *  id="chatbot-load-script"
 *  data-country="hk/zh"
 *  data-test="true"
 *  data-use-grunticon="false"
 *  data-title="Stacy"
 *  data-subtitle="Stacy"
 *  data-avatar-icon-name="icon-chatbot-avatar"
 *  data-greeting-name="animated-avatar.gif"
 *  data-close-chat-icon-name="icon-close-chat">
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
 *  data-chatbot-avatar-icon-name="icon-chatbot-avatar-round"
 *  data-chatbot-greeting-name="animated-avatar.gif"
 *  data-chatbot-close-chat-icon-name="icon-close-chatbot">
 * </div>
 *
*/
```

### Example usage

Dropping this snippet to any page should work:

```
<script src="{{ URL TO LOADER.JS SCRIPT }}" 
   type="text/javascript"
   id="chatbot-load-script" 
   data-country="hk/zh">
</script>

<div class="m-click-to-chat chatbot"></div>
```

### Enable HTTPS on localhost

The need for HTTPS on localhost
===============================

Currently if `grunt chatbot-serve` is run in the chatbot directory, the chatbot UI can be accessed via **http**://localhost:8448 but not **https**://localhost:8448. This is fine if the chatbot UI is required to load standalone. However, if you need to mimic the iframing of the chatbot like it is deployed on the public website, then you have the ability to run `grunt serve` on the base assets directory and navigate to https://localhost:8443/page-country-landing.html to see the chatbot icon and interact with it. 

However, since `grunt serve` will serve pages to **https**, then we are unable to load an iframe without **https**. An alternative would be to serve the chatbot pages using a service like [ngrok](https://ngrok.com/) or [serveo](http://serveo.net/), however then you would run into cross domain issues. Then you could serve the base directory's distribution folder via the same service so they will both be on the same domain, but then you will face issues with speed, since you will be tunnelling to and fro for both the parent site and the chatbot. This will adversely affect your time to develop and test changes. 

A simple answer would then be to use a service like [Caddy](https://caddyserver.com/) to enable **https** on localhost, which will solve both your cross domain issue, with speed and with https. Caddy enables **https** by default, however since the certificate is temporary and not attached to an actual SSL certificate, you will have to accept the *Your connection is not secure* warning when you visit the site every time, which can be annoying. 

![error](https://pli.io/lc3pw.png)

The end result that we are trying to achieve will be 

![end](https://pli.io/lcdJn.png)

Steps
=====

#### 1. Download Caddy

https://caddyserver.com/download

#### 2. Install Caddy

https://caddyserver.com/tutorial/beginner#install

#### 3. Navigate to the chatbot directory 

```
cd src/assets/js/modules/chatbot
```

The reason is because in the parent directory there are already some certificates that are required for other functions to run, so we keep the files for Caddy in the chatbot directory separate from the main code. 

#### 4. Create a Caddyfile

```
touch Caddyfile
```

#### 5. Add this into the Caddyfile

```
localhost:8448 {
    tls server.crt server.key
}
```

We will be creating the `server.crt` and `server.key` files in the upcoming steps.

#### 6. Generate a root CA key

```
openssl genrsa -des3 -out rootCA.key 2048
```

Enter a passphrase between 4 - 1023 characters.

#### 7. Create a `.pem` file from the root CA

```
openssl req -x509 -new -nodes -key rootCA.key -sha256 -days 1024 -out rootCA.pem
```

You will be prompted for the passphrase you entered for the `rootCA.key` file.

You will also be asked a series of questions. You may enter any random strings for the questions, but for `Common Name (e.g. server FQDN or YOUR name)` enter `localhost`.

#### 8. Trust the root certificate

You need to to tell your Mac to trust your root certificate so all individual certificates issued by it are also trusted.

Double click on the `rootCA.pem` file you created and Keychain Access will open. A certificate with the name **localhost** will appear. On some versions of OSX, the certificate will have a red cross ❌ on the bottom right of the icon. Double click the imported certificate and change the “When using this certificate:” dropdown to Always Trust in the Trust section. Close the window and you will be prompted for your User password. 

#### 9. Create a base `.conf` file that your future certificates will be based on so you don't have to keep typing them in

```
$ touch server.csr.conf
```

Paste this in the file you just created

```
[req]
default_bits = 2048
prompt = no
default_md = sha256
distinguished_name = dn

[dn]
C=SG
ST=SG
L=SG
O=SG
OU=SG
emailAddress=hello@example.com
CN = localhost
```

#### 10. Create a v3.ext file

This is so that you can create a [X509 v3 certificate](https://en.wikipedia.org/wiki/X.509).

```
$ touch v3.ext
```

Paste this in

```
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names

[alt_names]
DNS.1 = localhost
```

#### 11. Create your server key file

```
openssl req -new -sha256 -nodes -out server.csr -newkey rsa:2048 -keyout server.key -config <( cat server.csr.conf )
```

#### 12. Create your SSL certificate from the `.ext` file you created earlier

```
openssl x509 -req -in server.csr -CA rootCA.pem -CAkey rootCA.key -CAcreateserial -out server.crt -days 500 -sha256 -extfile v3.ext
```

You will be prompted for your `rootCA.key` passphrase from Step 6.

#### 13. Run Caddy

In your chatbot folder where all the files you created above should be, run Caddy. 

```
$ caddy
```

***

Done! Congratulations, you can now navigate to https://localhost:8448 and you will be greeted with a beautiful green padlock 🔒. To exit Caddy, hit CTRL + C.

By default, Caddy will use the current directory (the directory it is being executed from, not the folder where the binary lives) as the root of the site. So to get to the distribution files for chatbot like `env.js` for `hk/en` for example, the URL will be https://localhost:8448/dist/hk/en/env.js

### Adding countries and languages for chatbot

The chatbot is built with the ability to launch for different countries or languages in mind. Currently we have only one country (HK) and two languages (EN & ZH-HK) which stems from a single code base and this may be extended (to some extent) to other countries and other languages as well. 

### Why not have a dynamic solution?

While building the chatbot, we explored the possibilities of having such a solution that would allow us to quickly make changes to parts of the chatbot such as the engine URL, languages, default values, etc. which ideally would allow us to deploy new languages, countries, and so on. 

#### 👍 Pros:

- quick to make changes
- no need to make code changes for more parts of the chatbot
    - currently to make changes to the engine URL for a specific language and country, we will need to make changes to the code
- easily launch or test chatbot for a specific language or country just by changing a parameter or making changes in the CMS

#### 👎 Cons:

- uses JS to load everything
- small changes to the chatbot engine URLs will require code changes and deployment to production
- folder structure very different from webview folder structure
    - this might present an issue if ever would be required to help us debug
    - also when we made extensive changes to their folder structure and code previously and some things stopped working, our code was easy to blame for the issues
- Assets are shared for all chatbots, so it would be difficult to customise certain parts of the chatbot if a certain country would like some customisations for their chatbot
- engine URL may be easily exposed
- path to chatbot would be a generic `/assets/global/chatbot?country=hk&language=en` instead of a dedicated `/assets/global/chatbot/hk/en` path

The chatbot team was also very resistant to spending time on such a solution as we were pressed to deliver a working solution as soon as possible. 

Over time, the extensibility of the chatbot became lesser and lesser as some aspects such as language switching that are highly customised for the HK market may not be suitable for other markets. 

### How to add a country or language

The creation of chatbot assets for countries and languages are handled via `countries.json` in `src\assets\js\modules\chatbot`. The grunt build task will use this file to decide which files to create for each country's language. The structure for `countries.json` is as follows:

```
{
  "dev": {
    "<country>": {
      "<language>": {
        "lang": "<language code/tag>",
        "url": {
          "<main URL>": "",
          "<alternative URL": ""
        }
      },
      // repeat language block above for more languages
      "defaults": { // default values for the country
        "lat": 22.280383, // any values can be set here to be used
        "long": 114.159077 // currently only lat & long are set
      }
    }
  },
  "staging": {
    // same structure as the dev env block above
  },
  "prod": {
    // same structure as the dev env block above
  }
}
```

To add a country, simply add a country block and ensure it has at least one language block.

To add a language, simply add a language block to the country.

The grunt build task will automatically create new files and folders based on the country and languages. 

The alternative URLs are used when the assets are shared but we require a different URL for different environments. 

### Updating translation strings for chatbot

The chatbot is designed to be able to handle different languages, with both 

## Important language specific inputs and outputs

### 1. Chatbot engine

The Chatbot engine gives predefined responses from its database to common questions. It is not a self-learning bot and does not craft sentences on its own.

Therefore, if when chatting in english and the response given is in Cantonese or vice versa, it may be an issue with the predefined responses. This is usually the case for - but not restricted to - the strings in the chat bubbles and not actionable items such as buttons.

#### Updating

To update these strings given by the engine, they have to be done on the engine/container side. Reach out to the chatbot team to do so. 

### 2. User defined strings used by webview templates

The webview templates allow for some strings to be translatable via manual configuration in `config.json`. In `config.json` there is a block with the key `"translations"`:

```
"translations": {
    "convertTimeStamp": false,
    "sendButton": "Send",
    "inputPlaceHolder": "Type a message...",
    "introScreenTitle": "Stacy",
    "introScreenMsg": "Typically replies instantly",
    "serverError": "Something has gone wrong with the Internet...",
    "serverErrorButtonMessage": "Chat with Live Agent",
    "serverErrorButtonUrl": "",
    "alsoAsk": "You may also ask:",
    "livechatCancelReturnButton": "Cancel and return to Virtual Assistant",
    "livechatCallMeLaterButton": "Call me later",
    "livechatCallBackErrorText": "Call back registration failed",
    "textBarMenuTitle": "Menu",
    "buttonCarouselText": "View Answer",
    "locationPicker": {
        "headerTitle": "Pick your Location",
        "inputLabel": "Location",
        "sendButton": "Select Position"
    },
    "screenReader": {
        "typingIconMsg": "Banking Assistant is typing",
        "carouselDetailsMsg": "From Banking Assistant. Here are the details.",
        "quickRepliesDetailsMsg": "From Banking Assistant. Here are the quick replies details."
    }
},
```

This block needs to be sent to the webview on initialisation in order for the template responses to be correctly built.

#### Updating

To update these strings, update `config.json`.

### 3. Custom elements

Elements added by our team are also translatable via `config.json` and are set by the keys that are outside of the `"translation"` block:

| Key | Description |
| --- | --- |
| tncTitle | Terms and conditions title |
| tnc | Terms and conditions (HTML markup allowed) |
| tncButton | Text for terms and conditions agreement |
| locationHeader | Map modal header |
| locationInput | Map input title |
| locationButton | Map modal set location button |
| maintenanceTitle | Error modal title |
| maintenanceSubtitle | Error modal subtitle |
| maintenanceBottomSubtitle | Error modal bottom subtitle |
| maintenanceLivebankWrapper | Error modal connect to livebank text (HTML allowed) |
| maintenanceReload | Error modal retry connection button |
| langSwitchTextZH | Language switch modal ZH text |
| langSwitchTextEN | Language switch modal EN text |
| confirmCancelBtnZH | Language switch modal ZH cancel button text |
| confirmCancelBtnEN | Language switch modal EN cancel button text |
| confirmAgreeBtnZH | Language switch modal ZH agree button text |
| confirmAgreeBtnEN | Language switch modal ZH agree button text |
| logOutBtn | Log out button text |
| cancelLoginMsg | Message if login modal is closed manually |
| pilotLoginUrl | URL to iBanking if in pilot mode |
| livebankProfile | default livebank profile if not set in page |

#### Updating

To update these strings, update `config.json`.

## Limitations

- The chatbot cannot detect languages entered. If you enter cantonese while the engine is set to English, it will not be able to understand you and vice versa. 
- If there are hardcoded language strings in elements in the webview templates (which are used to build replies depending on the type of response) then the same string will always be returned.

### Chatbot security

As per requirements, there are specific and secure instances in order to access the chatbot and communicate with it, as well as measures for customer privacy as the MVP1.0 for chatbot allows for oAuth lite login.

Measures in place
-----------------

### Disabled direct access to chatbot

In order to combat phishing, browsers that attempt to directly access chatbot pages will not be allowed to load them and the browser will be redirected to a blank page instead. 

Try visiting the index.html file in the browser.

### Anti clickjacking

Also in order to combat phishing, we only allow specific domains to load the chatbot as an iframe. The list of domains are managed in `src/assets/js/modules/chatbot/src/base/base.html` in the `allowedDomains` variable.

If a website attempts to place the chatbot URL in an iframe and its domain is not in the list of `allowedDomains`, the page will redirect to a blank page. 

Try it on https://www.lookout.net/test/clickjack.html with the index.html file

### Secure post messaging

In order for the parent container to communicate with the chatbot when the chatbot page is loaded in an iframe, we have to use a secure messaging protocol known as post messaging. Messages sent to and from the iframe will only be accepted if the domain is trusted.

For sending messages to the chatbot, the list of trusted domains is the same as the `allowedDomains` list above. 

For sending messages to the parent container, the list of trusted domains is in `/src/assets/js/commons/chatbot.js` stored in the variable `"allowedOrigins"`

### Auto log out on close 

Since MVP1.0, users can use the chatbot for authenticated purposes and as such, the chatbot has to be more secure to prevent sensitive data from being leaked. From MVP1.0, we now no longer have chat continuity and users will have to restart their conversations with the chatbot if they navigate to a new page or refresh the page.

Also, as an added security measure, the browser will not store the cookie for the chatbot session once the window/tab is closed and automatically log the user out. 

### Functional testing

#### Pre-requisites:

* Install selenium-webdriver
  * https://www.npmjs.com/package/selenium-webdriver
  * install the specific webdrivers that you require (e.g. for chrome/ firefox/ safari)
* Install chai and chai-webdriver
  * https://www.chaijs.com/guide/installation/
  * https://www.npmjs.com/package/chai-webdriver
* Install mocha
  * https://www.npmjs.com/package/mocha
* Include the webdriver into your PATH
  * for example, if you downloaded chromedriver for chrome testing, make sure that the driver is included into your system's PATH 

#### To run the automated test for chatbot HK:

1. Clone the repo
2. cd to chatbot test folder
``cd chatbot/test``
3. Install all the dependencies that is required
``npm install``
4. Make sure you have the relevant selenium webdriver installed (e.g. chrome webdriver/ firefox webdriver)
5. To test in specific browser versions, you need to install the specific respective webdriver version
6. To run the test, the general command is: npm test --browser=<browser type> --env=<your env> . For example, 
  * In dev environment for chrome browser: 
``npm test --browser=chrome --env=dev``
  * In prod environment for chrome browser: 
``npm test --browser=chrome --env=prod``
  * In prod environment for firefox browser: 
``npm test --browser=firefox --env=prod``

#### Things to note:

These values are hard coded in the test:
* URLS
* Texts
  * HK web title
  * H1 welcome title
  * Stacy's name
  * Button values
  * Terms & Conditions text (EN and CN)
  * Stacy's replies
* Others
  * chatbot iframe xpath
  * chatbot class and id names

If these values have been changed/ updated, it is necessary to update the hardcoded values in the test.js file as well. Else, the test will always fail.

#### To run unit test for chatbot
1. cd to the root folder
2. run ``npm test``
  * this will run all the other Jest tests in the repo
  * do remember to run ``npm install`` in the root folder first to install all the dependencies

#### Things to note
* Unit testing coverage:

  * chatbot/src/base/js/env.js - covered
  * chatbot/src/modules/active/externaChatHandover.js - covered
  * chatbot/src/modules/active/locationpicker.jquery.js - covered
  * chatbot/src/templates/breaklines.js - covered
  * chatbot/src/templates/compare.js - covered
  * chatbot.js - only 2 functions covered

* Unit tests js files for chatbot are under the /chatbot/test/__ tests __ folder

