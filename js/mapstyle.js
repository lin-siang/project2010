



function initialize() {
  latlng = new google.maps.LatLng(35.669781,139.717064);
  var myOptions = {
    zoom: 17, /*拡大比率*/
    center: latlng, /*表示枠内の中心点*/
    mapTypeId: google.maps.MapTypeId.ROADMAP/*表示タイプの指定*/
  };
  map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);

  /*アイコン設定▼*/
  var icon = new google.maps.MarkerImage('/images/format/map_img.png',
    new google.maps.Size(24,38),/*アイコンサイズ設定*/
    new google.maps.Point(0,0)/*アイコン位置設定*/
    );
  var markerOptions = {
    position: latlng,
    map: map,
    icon: icon,
    title: '株式会社アークフィリア'
  };
  var marker = new google.maps.Marker(markerOptions);
　/*アイコン設定ここまで▲*/

  /*取得スタイルの貼り付け*/
  var styleOptions = [
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      { "hue": "#ffd500" },
      { "saturation": -81 },
      { "lightness": 45 }
    ]
  },{
    "stylers": [
      { "weight": 0.1 },
      { "hue": "#ffb300" },
      { "lightness": 1 },
      { "saturation": -72 }
    ]
  }
];
  var styledMapOptions = { name: '株式会社アークフィリア' }
  var sampleType = new google.maps.StyledMapType(styleOptions, styledMapOptions);
  map.mapTypes.set('sample', sampleType);
  map.setMapTypeId('sample');

  $(window).resize(function(){
    google.maps.event.trigger(map, 'resize');
    map.setCenter(latlng);
  });
}


