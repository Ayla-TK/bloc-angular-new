(function(){
 
 function AlbumCtrl(Fixtures, SongPlayer) {
     this.albumData = Fixtures.getAlbum();
     this.songPlayer;
 
}
 
 angular
         .module('blocJams')
         .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl]);
 })();