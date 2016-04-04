// ==UserScript==
// @name         CommunityVote
// @namespace    http://simpcraft.com/
// @version      0.10
// @description  allows robin users to choose what i vote
// @author       /u/haykam821
// @match        https://www.reddit.com/robin*
// @grant        none
// ==/UserScript==

 function sendMessage(message){
     $("#robinSendMessage > input[type='text']").val(message);
     $("#robinSendMessage > input[type='submit']").click();
 }
 
 function introductionMessage(){
     sendMessage('/vote grow'); // I don't want to be kicked out!
     sendMessage('[CommunityVote] I vote what you choose. Type \"\!cv \(stay or grow\)\" to choose what I will vote for, and \"!cv  commands\" for more.');
}

 window.onload = introductionMessage; // Make sure it sends the introduction message!

 setTimeout(function(){
 var target = document.querySelector('#robinChatMessageList');
 var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        var msg = $(mutation.addedNodes[0].lastElementChild).text();
        if(msg.includes('!cv grow')) {
            sendMessage('/vote grow');
            sendMessage('[CommunityVote] I have voted GROW.');
		}
        if(msg.includes('!cv stay')) {
            sendMessage('/vote stay');
            sendMessage('[CommunityVote] I have voted STAY.');
		}
        if(msg.includes('!cv abandon')) {
            sendMessage('[CommunityVote] I refuse to vote ABANDON.');
		}
        if(msg.includes('!cv help')) {
            sendMessage('[CommunityVote] I vote what you choose. Type \"\!cv \(stay or grow\)\" to choose what I will vote for, and \"!cv  commands\" for more.');
		}
        if(msg.includes('!cv commands')) {
            sendMessage('[CommunityVote] !cv \[grow, stay, abandon, help, commands, creator, version\]');
		}
        if(msg.includes('!cv creator')) {
            sendMessage('[CommunityVote] I was created by /u/haykam821.');
		}
        if(msg.includes('!cv author')) {
            sendMessage('[CommunityVote] I was created by /u/haykam821.');
		}
        if(msg.includes('!cv version')) {
            sendMessage('[CommunityVote] This bot is running version 0.10.');
		}
    });
 });
 observer.observe(target, {childList: true});
 }, 20);
