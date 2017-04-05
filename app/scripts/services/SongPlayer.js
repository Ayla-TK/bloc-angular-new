(function() {
     function SongPlayer(Fixtures) {
     var SongPlayer = {};

     var currentAlbum = Fixtures.getAlbum();
       
/**
 * @desc Buzz object audio file
 * @type {Object}
 */       
     var currentBuzzObject = null;

  /**
 * @function setSong
 * @desc Stops currently playing song and loads new audio file as currentBuzzObject
 * @param {Object} song
 */
    var setSong = function(song) {
    if (currentBuzzObject) {
        stopSong(song);
        SongPlayer.currentSong.playing = null;
    }
 
    currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
    });
 
    SongPlayer.currentSong = song;
 };
       
   /**
   * @function playSong
   * @desc plays new song
   * @param {Object} song
   */
       
    var playSong = function(song){
      currentBuzzObject.play();
      song.playing = true;
    }

    var getSongIndex = function(song) {
     return currentAlbum.songs.indexOf(song);
 };    

 /**
   * @function stopSong
   * @desc stops current song
   * @param {Object} song
   */
       
    var stopSong = function(song){
      stopSong(song);
      song.playing = null;
    }       
/**
 * @desc Active song object from list of songs
 * @type {Object}
 */       
     SongPlayer.currentSong = null;
 
 /**
 * @function play
 * @desc Play current or new song
 * @param {Object} song
 */      
     SongPlayer.play = function(song) {
         song = song || SongPlayer.currentSong;
         if (SongPlayer.currentSong !== song) {
             
         setSong(song);
         playSong(song);   
         }
     };
  
  /**
 * @function pause
 * @desc Pause current song
 * @param {Object} song
 */
    SongPlayer.pause = function(song) {
     song = song || SongPlayer.currentSong;  
     currentBuzzObject.pause();
     song.playing = false;
 };   
       
    /**
 * @function previous song
 * @desc switch to previous in the index
 * @param {Object} song
 */     
    SongPlayer.previous = function() {
     var currentSongIndex = getSongIndex(SongPlayer.currentSong);
     currentSongIndex--;
 };     
       
    if (currentSongIndex < 0) {
         stopSong(song);
         SongPlayer.currentSong.playing = null;
     } else {
         var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
     }   
          return SongPlayer;
     }
 
  /**
 * @function next song
 * @desc switch to next in the index
 * @param {Object} song
 */     
    SongPlayer.next = function() {
     currentSongIndex++;
 };     
       
    if (currentSongIndex < 0) {
         stopSong(song);
         SongPlayer.currentSong.playing = null;
     } else {
         setSong(song);
         playSong(song);
     }   
          return SongPlayer;
     }
     angular
         .module('blocJams')
         .factory('SongPlayer', ['Fixtures', SongPlayer]);
 })();
