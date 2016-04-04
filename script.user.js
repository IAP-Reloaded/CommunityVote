// ==UserScript==
// @name         CommunityVote
// @namespace    http://simpcraft.com/
// @version      0.2
// @description  allows robin users to choose what i vote
// @author       /u/haykam821
// @match        https://www.reddit.com/robin*
// @grant        none
// ==/UserScript==

 function sendMessage(message){
     $("#robinSendMessage > input[type='text']").val(message);
     $("#robinSendMessage > input[type='submit']").click();
 }

sendMessage('Type \"\!cv \(vote\)\" to choose what I will vote for.');

 setTimeout(function(){
 var target = document.querySelector('#robinChatMessageList');
 var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        var msg = $(mutation.addedNodes[0].lastElementChild).text();
        if(msg.includes('!cv grow')) {
            sendMessage('/vote grow');
            sendMessage('I have voted GROW.');
		}
        if(msg.includes('!cv stay')) {
            sendMessage('/vote stay');
            sendMessage('I have voted STAY.');
		}
        if(msg.includes('!cv abandon')) {
            sendMessage('I refuse to vote ABANDON.');
		}
        if(msg.includes('!cv help')) {
            sendMessage('Type \"\!cv \(vote\)\" to choose what I will vote for.');
		}
        if(msg.includes('!cv creator')) {
            sendMessage('I was created by /u/haykam821.');
		}
    });
 });
 observer.observe(target, {childList: true});
 }, 20);
