(function () {
     function SongPlayer($rootScope, Fixtures) {
       
      var SongPlayer = {};
       
   /**
    * @desc Current album object retrieved from fixtures
    * @type {Object}
    */
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
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      }
    
 
      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });
      
      currentBuzzObject.bind('timeupdate', function() {
         $rootScope.$apply(function() {
             SongPlayer.currentTime = currentBuzzObject.getTime();
         });
      });
 
      SongPlayer.currentSong = song;
      currentBuzzObject.play();
    };
    
  
     /**
     * @function setCurrentTime
     * @desc Set current time (in seconds) of currently playing song
     * @param {Number} time
     */
     SongPlayer.setCurrentTime = function(time) {
         if (currentBuzzObject) {
             currentBuzzObject.setTime(time);
         }
     };
       
    /**
    * @function playSong
    * @desc plays new song
    * @param {Object} song
    */
    var playSong = function(song){
      currentBuzzObject.play();
      song.playing = true;
      SongPlayer.currentAlbum = currentAlbum;
    };
    
   /**
   * @function stopSong
   * @desc stops current song
   * @param {Object} song
   */
       
     var stopSong = function(song) {
      currentBuzzObject.stop();
      song.playing = null;
      SongPlayer.currentAlbum = null;
      SongPlayer.currentSong = null;
    };      
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
         else if (SongPlayer.currentSong === song) {
             if (currentBuzzObject.isPaused()) {
             playSong(song);
            }
         }
     };     
    
       
    /**
    * @function getSongIndex (private)
    * @desc Gets array index of a song from the current album
    * @param {Object} song
    */
    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };    

       
    /**
     * @desc Active song object from list of songs
     * @type {Object}
     */       
    SongPlayer.currentSong = null;
    
    /**
     * @desc Current playback time (in seconds) of currently playing song
     * @type {Number}
     */
    SongPlayer.currentTime = null;
 
    /**
    * @desc Current album variable (public)
    * @type {Object}
    */
    SongPlayer.currentAlbum = null;
  
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
        if (currentSongIndex < 0) {
          currentBuzzObject.stop();
          
        } else {
          var song = currentAlbum.songs[currentSongIndex];
           setSong(song);
           playSong(song);
        }   
          
     };
  
 
    /**
   * @function next song
   * @desc switch to next in the index
   * @param {Object} song
   */     
    SongPlayer.next = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;
  
      if (currentSongIndex >= currentAlbum.songs.length) {
        stopSong(SongPlayer.currentSong);
     } 
      else {
         var song = currentAlbum.songs[currentSongIndex];
         setSong(song);
         playSong(song);
     }   
  }; 
       
return SongPlayer;
}
  
     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();
