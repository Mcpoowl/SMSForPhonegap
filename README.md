# SMS for Phonegap

SMS for Phonegap uses a Cordova plugin to enable sending SMS messages from your mobile Mendix application. 

## Contributing

For more information on contributing to this repository visit [Contributing to a GitHub repository](https://world.mendix.com/display/howto50/Contributing+to+a+GitHub+repository)!

## Typical usage scenario

For when you want to send an SMS from your mobile application.

## Description

This widget renders two input fields and a button in your application; a number input field which can be non-editable and invisible, a message input field and a button that sends the message.

## Phonegap configuration

If you use this widget, note that you need to edit phonegap config.xml with the following additions:

* Upgrade your Phonegap version to cli-6.0.0 (<preference name="phonegap-version" value="cli-6.0.0" />)
* Add the sms plugin to the plugin list (<gap:plugin name="cordova-sms-plugin" version="0.1.10" source="npm" />)

After having done this, be sure to rebuild your phonegap package.

## Configuration & Properties

The widget needs an entity as it's context. It also needs a microflow which returns a string that is used as the phone number. Note that there is no validation on the phone number, so if you want some validation, be sure to build that into your microflow.

Place the widget at the desired location on your page. The properties are:

* Phone number - A microflow that returns a string which is used as a phone number
* Button text - The text that is displayed on the send button
* Read only - A boolean that defines if the number field is read only
* Visibility - A boolean that defines if the number field is visible

## Known issues and bugs

None yet. But let us know if you find any!