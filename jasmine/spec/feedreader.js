/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds ', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('have all feeds with defined non-empty URL', function () {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).toBeGreaterThan(0);
            });
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('have all feeds with defined non-empty name', function() {
           allFeeds.forEach(function (feed) {
               expect(feed.name).toBeDefined();
               expect(feed.name.length).toBeGreaterThan(0)
           });
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has correct URL.
         */
        it('have all feeds with correct URL', function() {
           allFeeds.forEach(function (feed) {
               var urlRegExp = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/i;
               expect(feed.url).toMatch(urlRegExp);
           });
        });
    });


    describe('The menu ', function() {

        /* Test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

        /* Test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it(' changes visibility after menu icon is clicked', function() {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBeFalsy();
            $('.menu-icon-link').click();
        });
    });

    describe('Initial Entries ', function () {

        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('have at least one element in feed container', function() {
            expect($('.entry-link').length).toBeGreaterThan(0);
        });
    });

    describe('New Feed Selection ', function() {

        var initialFeedTitle;
        var initialFeed;

        beforeEach(function(done) {
            loadFeed(0, function() {
                //save the initial state and ensure feed was correctly loaded
                initialFeedTitle = $('.header-title').html();
                expect(initialFeedTitle).toMatch(allFeeds[0].name);
                initialFeed = $('.feed').html();
                expect($('.entry-link').length).toBeGreaterThan(0);

                //load different feed before checking the results in test
                loadFeed(1, function () {
                    done();
                });
            })
        });

        // restore the initial state
        afterEach(function() {
           loadFeed(0);
        });

        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it('has changed the feed list after another feed selection ', function() {
            expect(initialFeedTitle).not.toEqual($('.header-title').html());
            expect($('.header-title').html()).toMatch(allFeeds[1].name);
            expect($('.entry-link').length).toBeGreaterThan(0);
            expect(initialFeed).not.toEqual($('.feed').html());
        });
    });
}());
