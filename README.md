# Project Overview

This project contains a web-based application that reads RSS feeds. The original developer of this application clearly saw the value in testing, they've already included [Jasmine](http://jasmine.github.io/) and even started writing their first test suite! Unfortunately, they decided to move on to start their own company and we're now left with an application with an incomplete test suite. That's where you come in.


## Set of tests included

### Basic feed content tests
* Test to make sure that the feed sources have been defined and that they are not empty.
* Test that loops through each feed and ensures it has a URL defined and that the URL is not empty.
* Test that loops through each feed and ensures it has a name defined and that the name is not empty.
* Test that loops through each feed in the allFeeds object and ensures it has correct URL.

### Menu tests
* Test that ensures the menu element is  hidden by default.
* Test that ensures the menu changes visibility when the menu icon is clicked.

### Asynchronous feed load function tests
* Test that ensures when the loadFeed function is called and completes its work, there is at least a single .entry element within the .feed container.
* Test that ensures when a new feed is loaded by the loadFeed function that the content actually changes.


## How to run the tests?
* Simply clone the repo and run the index.html

