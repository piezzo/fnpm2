fnpm2
-----

fnpm is a very simple bitcoin full node monitor node written in nodejs and React.

This is a small side project, that is meant to teach me some React. Feel free to use it and extend it, but please don't expect it to run out of the box if you decide to clone the master-branch.

Quickstart
----------

Assuming you already have nodejs installed (if not, get it from https://nodejs.org/):

    download and unzip.
    change into project directory.
    edit config file config/default.json and adapt to your system.
    $ npm install
    $ node server

If you connect to http://localhost:3000you should see a nice visualization of the cli-command getpeerinfo and see something like this (although this is the older version, that was meant to get a grip into node - now looks way nicer ;)):

![fnpm screenshot](https://raw.githubusercontent.com/piezzo/fnpm/master/fnpm_screenshot.png "screenshot")

License
-------

fnpm2 is released under the terms of the MIT license. See [COPYING](COPYING) for more
information or see http://opensource.org/licenses/MIT.
