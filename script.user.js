// ==UserScript==
// @name         CommunityVote
// @namespace    http://simpcraft.com/
// @version      0.5
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
     sendMessage('[CommunityVote] Type \"\!cv \(vote\)\" to choose what I will vote for.');
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
            sendMessage('[CommunityVote] Type \"\!cv \(vote\)\" to choose what I will vote for.');
		}
        if(msg.includes('!cv creator')) {
            sendMessage('[CommunityVote] I was created by /u/haykam821.');
		}
    });
 });
 observer.observe(target, {childList: true});
 }, 20);
