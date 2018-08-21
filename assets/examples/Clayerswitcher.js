(function() {
	
		  var layer1 = new ol.source.ImageWMS({
	        		crossOrigin:'Anonymous',
                   ratio: 1,
                   url: 'http://localhost:8080/geoserver/myWorkspace/wms',
                   params: {
                   	'FORMAT': "image/png",
                   'VERSION': '1.1.1',
                   STYLES: '',
                   LAYERS: 'myWorkspace:wv1'
                   }
                   });    
           var layer2 = new ol.source.ImageWMS({
	        		crossOrigin:'Anonymous',
                   ratio: 1,
                   url: 'http://localhost:8080/geoserver/myWorkspace/wms',
                   params: {
                   	'FORMAT': "image/png",
                   'VERSION': '1.1.1',
                   STYLES: '',
                   LAYERS: 'myWorkspace:wv2'
                   }
                   });   
 		  var layer3 = new ol.source.ImageWMS({
	        		crossOrigin:'Anonymous',
                   ratio: 1,
                   url: 'http://localhost:8080/geoserver/myWorkspace/wms',
                   params: {
                   	'FORMAT': "image/png",
                   'VERSION': '1.1.1',
                   STYLES: '',
                   LAYERS: 'myWorkspace:wv3'
                   }
                  }); 
    		  var layer4 = new ol.source.ImageWMS({
	        		crossOrigin:'Anonymous',
                   ratio: 1,
                   url: 'http://localhost:8080/geoserver/myWorkspace/wms',
                   params: {
                   	'FORMAT': "image/png",
                   'VERSION': '1.1.1',
                   STYLES: '',
                   LAYERS: 'myWorkspace:wv4'
                   }
                   });    
  	
	 var color=new Array();
     var name=new Array();  
     var newId = 1;
     var r,g,b;
    var wfsVectorLayer = null;
    var drawedFeature = new Array();
    var id =1; 
      // 閸掓稑缂撻悽銊ょ艾閺傛壆绮崚绉別ature閻ㄥ埐ayer
    var drawLayer = new ol.layer.Vector({
      source: new ol.source.Vector(),
    
    });
    
    var drawInteraction = new ol.interaction.Draw({
      type: 'Point', // 鐠佹儳鐣炬稉铏瑰仯
      source: drawLayer.getSource()
    });
  
    drawInteraction.on('drawend', function(e) {
      // 缂佹ê鍩楃紒鎾存将閺冭埖娈忕�涙绮崚鍓佹畱feature
      id= prompt("description锟�");
      name.push(id);
      drawedFeature.push(e.feature);
    });
    
	var projection = new ol.proj.Projection({
	  code: 'EPSG:404000',
          units: 'degrees',
          axisOrientation: 'neu',
          extent:[1968,958,2917,1945],
          global: false
	});
	var map = new ol.Map({
        target: 'map',
        layers: [
                          new ol.layer.Image({
   				          	title: '1',
            				type: 'base',
            				source: layer1,
    						 }),
    						  new ol.layer.Image({
   				          	title: '2',
            				type: 'base',
            				source: layer2,
    						 }),
    						  new ol.layer.Image({
   				          	title: '3',
            				type: 'base',
            				source: layer3,
    						 }),
    						  new ol.layer.Image({
   				          	title: '4',
            				type: 'base',
            				source: layer4,
    						 }),
    						 drawLayer
            ],
        view: new ol.View({
            center:[121.17,28.34],
            zoom:15,
            projection:'EPSG:4326',
           resolution:0.000085177929
        		})
    });

    function NDVI(pixel) {
        var r = pixel[0][1]-pixel[1][1]; 
        var g = pixel[1][1]+pixel[0][1];
        return (r / g);
      } 

    var ndvi = document.getElementById("NDVI");
    ndvi.onclick = function ndvi_c(){
   
      var start = new Date().getTime();

     //婵＄偛绉烽～锕傚箰閸ャ劍娈�
     var rasterveg = new ol.source.Raster({
        sources: [layer4,layer3],
        operation: function(pixels, data) {
        
             var value = NDVI(pixels);
             
            pixels[0][0] = 0;
            pixels[0][1] = value*255;
            pixels[0][2] = 0;
            pixels[0][3] = value*255;
          
          return [pixels[0][0],pixels[0][1],pixels[0][2],pixels[0][3]];
        },
        lib:{
        	NDVI:NDVI
        }
      });
      var end = new Date().getTime();
        NDVI_time=end-start;
        
    	var NDVI_l = new ol.layer.Image({
     	title: 'NDVI',
     	type: 'base',
     	source: rasterveg
     });
    	map.addLayer(NDVI_l);
        
    }

    var ndbi = document.getElementById("NDBI");
    ndbi.onclick = function ndbi_c(){
    var start = new Date().getTime();
      //鐎点倛娅ｉ悺姘跺箰閸ャ劍娈�
    var rasterbuilding = new ol.source.Raster({
        sources: [layer5,layer6],
        operation: function(pixels, data) {
             var value = NDBI(pixels);
             
            pixels[0][0] = value*255;
            pixels[0][1] = 0;
            pixels[0][2] = 0;
            pixels[0][3] = 125;
       
          return [pixels[0][0],pixels[0][1],pixels[0][2],pixels[0][3]];
        },
        lib:{
        	NDBI:NDVI
        }
      });
      
        
        
        var NDBI_l = new ol.layer.Image({
     	title: 'NDBI',
     	type: 'base',
     	source: rasterbuilding
     });
    	map.addLayer(NDBI_l);
    	  var end = new Date().getTime();
    	  NDBI_time = end-start;
    }

	var ndwi = document.getElementById("NDWI");
	ndwi.onclick = function ndwi_c(){
		 var start = new Date().getTime();
    var rasterwater = new ol.source.Raster({
        sources: [layer2,layer4],
        operation: function(pixels, data) {
        
             var value = NDWI(pixels);

             pixels[0][0] = 0;
            pixels[0][1] = 0;
            pixels[0][2] = value*255;
            pixels[0][3] = value*255;
    
          return [pixels[0][0],pixels[0][1],pixels[0][2],pixels[0][3]];
        },
        lib:{
        	NDWI:NDVI
        }
      });
       var end = new Date().getTime();
        NDWI_time = end-start;
       var NDWI_l = new ol.layer.Image({
     	title: 'NDWI',
     	type: 'base',
     	source: rasterwater
     });
    	map.addLayer(NDWI_l);
    }
	



	var band_select = document.getElementById("band");
	band_select.onclick = function selectband(){
		r = prompt("band_r")-1;
		g = prompt("band_g")-1;
		b = prompt("band_b")-1;        
   		rasterstack.set('r', r);
        rasterstack.set('b', b);
        rasterstack.set('g', g);
        rasterstack.changed();
     
  
   
     var HC_1 = new ol.layer.Image({
     	title: 'HC',
     	type: 'base',
     	source: rasterstack
     });
    	map.addLayer(HC_1);
	}
	  var start = new Date().getTime();
		 var rasterstack = new ol.source.Raster({
        sources: [layer1,layer2,layer3,layer4],
        operation: function(pixels, data) {   
        	var hc = new Array();
        	hc=[pixels[data.r][0],pixels[data.g][0],pixels[data.b][0],pixels[0][3]];
            return hc;
        }
     });
      var end = new Date().getTime();
     var  HC_time =end-start;
    rasterstack.on('beforeoperations', function(event) {
        event.data.r = rasterstack.get('r');
        event.data.g = rasterstack.get('g');
        event.data.b = rasterstack.get('b');
      }); 

    var sample_1 = document.getElementById("SAMPLE");
    sample_1.onclick = function sampleclloct(){
    	map.removeInteraction(drawInteraction);
        map.addInteraction(drawInteraction);
        map.on('singleclick',function(evt){
    	var layers = map.getLayers().getArray();
    	var pixel = map.getEventPixel(evt.originalEvent);
        var hit = map.forEachLayerAtPixel(pixel, function(lyr,pv) {
        	if (lyr==layers[5]){
               color.push(pv); 
               console.log(color);
        	}
        });
        	
    	});
    }
    var save_1 = document.getElementById("SAVE");
    save_1.onclick = function save() {
   		for (var ii in drawedFeature){
  	        var geometry = drawedFeature[ii].getGeometry().clone();
      		geometry.applyTransform(function(flatCoordinates, flatCoordinates2, stride) {
        for (var j = 0; j < flatCoordinates.length; j += stride) {
          		var y = flatCoordinates[j];
          		var x = flatCoordinates[j + 1];
          		flatCoordinates[j] = x;
          		flatCoordinates[j + 1] = y;
        	}
      		});
      // 鐠佸墽鐤唂eature鐎电懓绨查惃鍕潣閹嶇礉鏉╂瑤绨虹仦鐐达拷褎妲搁弽瑙勫祦閺佺増宓佸┃鎰畱鐎涙顔岄弶銉啎缂冾喚娈�
        var newFeature = new ol.Feature();
        newFeature.setGeometryName('geom');
        newFeature.set('id', name[ii]);
        newFeature.setGeometry(new ol.geom.Point((geometry.getCoordinates())));
        addWfs([newFeature]);
      }
      // 3缁夋帒鎮楅敍宀冨殰閸斻劌鍩涢弬浼淬�夐棃顫瑐閻ㄥ垿eature
      setTimeout(function() {
        drawLayer.getSource().clear();
        queryWfs();
      }, 300);
          }
  
      function queryWfs() {
      if (wfsVectorLayer) {
        map.removeLayer(wfsVectorLayer);
      }
      wfsVectorLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
          format: new ol.format.GeoJSON({
            geometryName: 'geom'
          }),
          url: 'http://210.32.187.59:8080/geoserver/wfs?service=wfs&version=1.1.0&request=GetFeature&typeNames=shp:new_shapefile&outputFormat=application/json&srsname=EPSG:4326'
        }),
   
      });
   
      map.addLayer(wfsVectorLayer);
      map.removeInteraction(drawInteraction);
    }
    
    function addWfs(features) {
      var WFSTSerializer = new ol.format.WFS();
      var featObject = WFSTSerializer.writeTransaction(features,
        null, null, {
          featureType: 'new_shapefile',
          featureNS: 'http://geoserver.org/shp',
          srsName: 'EPSG:4326'
        });
      var serializer = new XMLSerializer();
      var featString = serializer.serializeToString(featObject);
      var request = new XMLHttpRequest();
      request.open('POST', 'http://210.32.187.59:8080/geoserver/wfs?service=wfs');
      request.setRequestHeader('Content-Type', 'text/xml');
      request.send(featString);
      }

  var start = new Date().getTime();
   var raster_c = new ol.source.Raster({
        sources: [layer1,layer2,layer3,layer4],
        operation: function(pixels, data) {
   
            var pixel1=pixels[0][0];
        	var pixel2=pixels[1][0];
        	var pixel3=pixels[2][0];
        	var pixel4=pixels[3][0];
            var type;
            
             float Bright;
				    			boolean HBright, MBright, LBright;
				    			HBright = false;
				    			MBright = false;
				    			LBright = false;
				    			Bright = (float) ((1 / 6.0)*(buf_1[j] + buf_2[j]  + 2 * buf_3[j]  + 2 * buf_4[j] ));
				    			if (Bright>60) HBright = true;
				    			else if (Bright >= 40) MBright = true;
				    			else LBright = true;

				    			float Vis;
				    			boolean HVis, MVis, LVis;
				    			HVis = false;
				    			MVis = false;
				    			LVis = false;
				    			Vis = (float) ((1 / 3.0)*(buf_2[j]  + buf_3[j]  + buf_1[j] ));
				    			if (Vis>50) HVis = true;
				    			else if (Vis >= 30) MVis = true;
				    			else LVis = true;

				    			float NIR;
				    			boolean HNIR, MNIR, LNIR;
				    			HNIR = false;
				    			MNIR = false;
				    			LNIR = false;
				    			NIR = buf_4[j] ;
				    			if (NIR>60) HNIR = true;
				    			else if (NIR >= 40) MNIR = true;
				    			else LNIR = true;

				    			float NDVI;           //normalized difference vegetation index
				    			boolean HNDVI, MNDVI, LNDVI;
				    			HNDVI = false;
				    			MNDVI = false;
				    			LNDVI = false;
				    			NDVI = (float) ((buf_4[j]  - buf_3[j] ) / (buf_4[j]  + buf_3[j]  + 0.001));
				    			if (NDVI>0.70) HNDVI = true;
				    			else if (NDVI >= 0.36) MNDVI = true;
				    			else LNDVI = true;

				    			//定义光谱规则，并判断单点规则属性
				    			boolean TKCL_SR, TNCL_SR, SNIC_SR, WASH_SR, PBGH_SR, V_SR, BBC_SR, SHB_SR, SHV_SR, SHCLSN_SR, DB_SR, WE_SR;
				    			TKCL_SR = false;               //thick clouds specttal rule
				    			TNCL_SR = false;               //thin clouds
				    			SNIC_SR = false;               //snow or ice
				    			WASH_SR = false;               //water or shadow
				    			PBGH_SR = false;               //pit bog or green house
				    			V_SR = false;                  //vegetation
				    			BBC_SR = false;               //barren land or bulit-up
				    			SHB_SR = false;               //shadow with barren land
				    			SHV_SR = false;               //shadow with vegetation
				    			SHCLSN_SR = false;            //shadon cloud or snow
				    			DB_SR = false;                 //dominant blue
				    			WE_SR = false;                 // wetland

				    			if ((min(buf_2[j] , buf_3[j] , buf_1[j] ) >= 0.7*max(buf_2[j] , buf_3[j] , buf_1[j] ))
				    				&& (max(buf_2[j] , buf_3[j] , buf_1[j] ) <= 0.7*buf_4[j] )
				    				)
				    				TKCL_SR = true;

				    			if ((buf_1[j] <= buf_2[j] ) && (buf_2[j]  <= buf_3[j] ) && (buf_3[j]  >= 0.7*buf_4[j] ))
				    				TNCL_SR = false;
				    			else if ((min(buf_2[j] , buf_3[j] , buf_1[j] ) >= 0.7*max(buf_2[j] , buf_3[j] , buf_1[j] ))
				    				&& (buf_4[j]  >= max(buf_2[j] , buf_3[j] , buf_1[j] ))&&(buf_3[j] >=0.7*buf_4[j] )     //revise 1  
				    				)
				    				TNCL_SR = true;

				    			if ((min(buf_2[j] , buf_3[j] , buf_1[j] ) >= 0.7*max(buf_2[j] , buf_3[j] , buf_1[j] ))
				    				&& (buf_4[j]  >= max(buf_2[j] , buf_3[j] , buf_1[j] ))
				    				)
				    				SNIC_SR = true;

				    			if ((buf_1[j] >= buf_2[j] ) && (buf_2[j]  >= buf_3[j] ) && (buf_3[j]  >= buf_4[j] ))
				    				WASH_SR = true;

				    			if ((max(buf_2[j] , buf_3[j] , buf_1[j] ) <= 0.7*buf_4[j] )
				    				&& (buf_1[j] >= 0.7*buf_3[j] ) && (buf_3[j]  >= 0.7*buf_1[j] )
				    				)
				    				PBGH_SR = true;

				    			if (buf_1[j] >= 0.7*max(buf_2[j] , buf_3[j] , buf_4[j] ))
				    				DB_SR = true;

				    			if ((buf_2[j]  >= 0.5*buf_1[j] )
				    				&& (buf_2[j]  >= 0.7*buf_3[j] ) && (buf_4[j] >max(buf_2[j] , buf_3[j] , buf_1[j] ))
				    				&& (buf_3[j] <0.7*buf_4[j] )
				    				)
				    				V_SR = true;                   //vegetation

				    			if ((buf_3[j]  >= 0.5*buf_1[j] ) && (buf_3[j]  >= 0.7*buf_2[j] )
				    				&& (buf_4[j]  >= 0.7*max(buf_2[j] , buf_3[j] , buf_1[j] ))
				    				)
				    				BBC_SR = true;
				    			//FBB_SR

				    			if ((buf_1[j] >= buf_2[j] ) && (buf_2[j]  >= buf_3[j] )
				    				&& (buf_3[j]  >= 0.7*buf_4[j] )
				    				)
				    				SHB_SR = true;       //和 WASH_SR冲突

				    			if ((buf_1[j] >= buf_2[j] ) && (buf_2[j]  >= buf_3[j] )
				    				&& (buf_1[j] >= 0.5*buf_4[j] ) && (buf_3[j] <0.7*buf_4[j] )
				    				)
				    				SHV_SR = true;

				    			if ((buf_1[j] >= 0.7*max(buf_2[j] , buf_3[j] , buf_1[j] ))
				    				&& (max(buf_2[j] , buf_3[j] , buf_4[j] ) >= 0.7*buf_1[j] )
				    				)
				    				SHCLSN_SR = true;

				    			if ((buf_1[j] >= buf_2[j] ) && (buf_2[j]  >= buf_3[j] )
				    				&& (buf_1[j] >= 0.7*buf_4[j] ) && (buf_3[j] < buf_4[j] )
				    				)
				    				WE_SR = true;

				    			//带层级的逻辑函数，定义类别；
				    			//定义一个累计类
				    			boolean CumulativeOR_SC = false;
				    			//sub-level 1:
				    			boolean CL_SC, SNIC_SC, WASH_SC, PB_SC;
				    			CL_SC = false;
				    			SNIC_SC = false;
				    			WASH_SC = false;
				    			PB_SC = false;

				    			if (!LNIR)
				    			{
				    				if (PBGH_SR)
				    				{
				    					PB_SC = true;
				    					type = 4;
				    					CumulativeOR_SC = CumulativeOR_SC || PB_SC;
				    				}
				    			}            //植物光谱判断提前 1
				    			if (!(CumulativeOR_SC))
				    			{
				    				if (WASH_SR && LBright && LVis && LNDVI && LNIR)
				    				{
				    					WASH_SC = true;
				    					type = 3;
				    					CumulativeOR_SC = CumulativeOR_SC || WASH_SC;
				    				}
				    			}          //水系光谱提前，2
				    			if (TKCL_SR || TNCL_SR)
				    			{
				    				if (!(LBright || LVis || LNIR))
				    				{
				    					CL_SC = true;
				    					type = 1;
				    					CumulativeOR_SC = CumulativeOR_SC || CL_SC;
				    				}
				    			}
				    			if (SNIC_SR)
				    			{
				    				if (!(LBright || LVis || LNIR || CumulativeOR_SC))
				    				{
				    					SNIC_SC = true;
				    					type  = 2;
				    					CumulativeOR_SC = CumulativeOR_SC || SNIC_SC;
				    				}
				    			}
				    			//sub-level 2:
				    			boolean PBHNDVI_LSC, PBMNDVI_LSC, PBLNDVI_LSC, SV_SC, AV_SC, WV_SC, SHR_LSC, AHR_LSC, DR_LSC, BBB_SC, BB_SC;

				    			PBHNDVI_LSC = false;
				    			PBMNDVI_LSC = false;
				    			PBLNDVI_LSC = false;
				    			SV_SC = false;
				    			AV_SC = false;
				    			WV_SC = false;
				    			SHR_LSC = false;
				    			AHR_LSC = false;
				    			DR_LSC = false;
				    			BBB_SC = false;
				    			BB_SC = false;

				    			if (PB_SC)
				    			{
				    				if (HNDVI)
				    				{
				    					PBHNDVI_LSC = true;
				    					type  = 5;
				    					CumulativeOR_SC = CumulativeOR_SC || PBHNDVI_LSC;
				    				}
				    				else if (MNDVI)
				    				{
				    					PBMNDVI_LSC = true;
				    					type  = 6;
				    					CumulativeOR_SC = CumulativeOR_SC || PBMNDVI_LSC;
				    				}
				    				else if (LNDVI)
				    				{
				    					PBLNDVI_LSC = true;
				    					type  = 7;
				    					CumulativeOR_SC = CumulativeOR_SC || PBLNDVI_LSC;
				    				}
				    			}
				    			if (!(CumulativeOR_SC))
				    			{
				    				if (V_SR && HNDVI)
				    				{
				    					SV_SC = true;
				    					type  = 8;
				    					CumulativeOR_SC = CumulativeOR_SC || SV_SC;
				    				}
				    			}
				    			if (!(CumulativeOR_SC || DB_SR))
				    			{
				    				if ((V_SR || SHV_SR) && MNDVI)
				    				{
				    					AV_SC = true;
				    					type = 9;
				    					CumulativeOR_SC = CumulativeOR_SC || AV_SC;
				    				}
				    			}
				    			if (!(CumulativeOR_SC || DB_SR))
				    			{
				    				if ((V_SR || SHV_SR && LNDVI))
				    				{
				    					WV_SC = true;
				    					type  = 10;
				    					CumulativeOR_SC = CumulativeOR_SC || WV_SC;
				    				}
				    			}
				    			if (!CumulativeOR_SC)
				    			{
				    				if (V_SR && HNDVI)
				    				{
				    					SHR_LSC = true;
				    					type = 11;
				    					CumulativeOR_SC = CumulativeOR_SC || SHR_LSC;
				    				}
				    			}
				    			if (!CumulativeOR_SC)
				    			{
				    				if ((V_SR || BBC_SR) && MNDVI)
				    				{
				    					AHR_LSC = true;
				    					type  = 12;
				    					CumulativeOR_SC = CumulativeOR_SC || AHR_LSC;
				    				}
				    			}
				    			if (!(HNIR || CumulativeOR_SC))
				    			{
				    				if (V_SR && LNDVI)
				    				{
				    					DR_LSC = true;
				    					type  = 13;
				    					CumulativeOR_SC = CumulativeOR_SC || DR_LSC;
				    				}
				    			}
				    			if (!(CumulativeOR_SC))
				    			{
				    				if (BBC_SR && HNIR && LNDVI)
				    				{
				    					BBB_SC = true;
				    					type  = 14;
				    					CumulativeOR_SC = CumulativeOR_SC || BBB_SC;
				    				}
				    			}
				    			if (!(HNIR || CumulativeOR_SC))
				    			{
				    				if (BBC_SR && LNDVI)//20150416
				    				{
				    					BB_SC = true;
				    					type  = 15;                         ///////?
				    					CumulativeOR_SC = CumulativeOR_SC || BB_SC;
				    				}
				    			}

				    			//sub-level 3:
				    			boolean SVHNIR_LSC, SVLNIR_LSC, AVHNIR_LSC, AVLNIR_LSC, WVHNIR_LSC, SSR_SC, ASR_SC;
				    			SVHNIR_LSC = false;
				    			SVLNIR_LSC = false;
				    			AVHNIR_LSC = false;
				    			AVLNIR_LSC = false;
				    			WVHNIR_LSC = false;
				    			SSR_SC = false;
				    			ASR_SC = false;

				    			if (SV_SC)
				    			{
				    				if (HNIR)
				    				{
				    					SVHNIR_LSC = true;
				    					type  = 16;
				    					CumulativeOR_SC = CumulativeOR_SC || SVHNIR_LSC;
				    				}
				    				else if (!HNIR)
				    				{
				    					SVLNIR_LSC = true;
				    					type = 17;
				    					CumulativeOR_SC = CumulativeOR_SC || SVLNIR_LSC;
				    				}
				    			}
				    			if (AV_SC)
				    			{
				    				if (HNIR)
				    				{
				    					AVHNIR_LSC = true;
				    					type = 18;
				    					CumulativeOR_SC = CumulativeOR_SC || AVHNIR_LSC;
				    				}
				    				else if (!HNIR)
				    				{
				    					AVLNIR_LSC = true;
				    					type  = 19;
				    					CumulativeOR_SC = CumulativeOR_SC || AVLNIR_LSC;
				    				}
				    			}
				    			if (WV_SC && HNIR)
				    			{
				    				WVHNIR_LSC = true;
				    				type  = 20;
				    				CumulativeOR_SC = CumulativeOR_SC || WVHNIR_LSC;
				    			}
				    			if (!CumulativeOR_SC)
				    			{
				    				if (V_SR && HNDVI)
				    				{
				    					SSR_SC = true;
				    					type  = 21;
				    					CumulativeOR_SC = CumulativeOR_SC || SSR_SC;
				    				}
				    			}
				    			if (!(CumulativeOR_SC || SHV_SR || WE_SR))
				    			{
				    				if (V_SR && MNDVI)
				    				{
				    					ASR_SC = true;
				    					type  = 22;
				    					CumulativeOR_SC = CumulativeOR_SC || ASR_SC;
				    				}
				    			}

				    			//sub-level 4:
				    			boolean WVLNIR_LSC, SSRHNIR_LSC, ASRHNIR_LSC, ASRLNIR_LSC, WR_LSC, SSRLNIR_LSC;
				    			WVLNIR_LSC = false;
				    			SSRHNIR_LSC = false;
				    			ASRHNIR_LSC = false;
				    			ASRLNIR_LSC = false;
				    			WR_LSC = false;
				    			SSRLNIR_LSC = false;

				    			if (!HNIR)
				    			{
				    				if (WV_SC)
				    				{
				    					WVLNIR_LSC = true;
				    					type = 23;
				    					CumulativeOR_SC = CumulativeOR_SC || WVLNIR_LSC;
				    				}
				    				else if (SSR_SC)
				    				{
				    					SSRLNIR_LSC = true;
				    					type  = 25;
				    					CumulativeOR_SC = CumulativeOR_SC || SSRLNIR_LSC;
				    				}
				    				else if (ASR_SC)
				    				{
				    					ASRLNIR_LSC = true;
				    					type = 27;
				    					CumulativeOR_SC = CumulativeOR_SC || ASRLNIR_LSC;
				    				}
				    			}
				    			if (HNIR)
				    			{
				    				if (SSR_SC)
				    				{
				    					SSRHNIR_LSC = true;
				    					type = 24;
				    					CumulativeOR_SC = CumulativeOR_SC || SSRHNIR_LSC;
				    				}
				    				else if (ASR_SC)
				    				{
				    					ASRHNIR_LSC = true;
				    					type = 26;
				    					CumulativeOR_SC = CumulativeOR_SC || ASRHNIR_LSC;
				    				}
				    			}
				    			if (V_SR && LNDVI)
				    			{
				    				if (!(CumulativeOR_SC))
				    				{
				    					WR_LSC = true;
				    					type  = 28;
				    					CumulativeOR_SC = CumulativeOR_SC || WR_LSC;
				    				}
				    			}

				    			//sub-level 5:
				    			boolean SHV_LSC = false;

				    			if (!(HNDVI || CumulativeOR_SC))
				    			{
				    				if (DB_SR && SHV_SR && LBright && LVis && LNIR)
				    				{
				    					SHV_LSC = true;
				    					type  = 29;
				    					CumulativeOR_SC = CumulativeOR_SC || SHV_LSC;
				    				}
				    			}

				    			//sub-level 6:
				    			boolean SHB_LSC = false;
				    			if (!(CumulativeOR_SC))
				    			{
				    				if (DB_SR && SHB_SR && LBright && LVis && LNDVI && LNIR)
				    				{
				    					SHB_LSC = true;
				    					type  = 30;
				    					CumulativeOR_SC = CumulativeOR_SC || SHB_LSC;
				    				}
				    			}

				    			//sub-level 7:
				    			boolean SHCL_LSC, TWASHSN_LSC;
				    			SHCL_LSC = false;
				    			TWASHSN_LSC = false;

				    			if (!(LNIR || LBright || LVis || CumulativeOR_SC))
				    			{
				    				if (DB_SR && SHCLSN_SR)
				    					SHCL_LSC = true;
				    				type = 31;
				    				CumulativeOR_SC = CumulativeOR_SC || SHCL_LSC;
				    			}

				    			if (!(LBright || LVis || CumulativeOR_SC))
				    			{
				    				if (DB_SR && SHCLSN_SR && LNIR)
				    				{
				    					TWASHSN_LSC = true;
				    					type = 32;
				    					CumulativeOR_SC = CumulativeOR_SC || TWASHSN_LSC;
				    				}
				    			}

				    			//sub-level 8:
				    			boolean WE_LSC;
				    			WE_LSC = false;
				    			if (!(CumulativeOR_SC))
				    			{
				    				if (WE_SR && LBright && LVis && LNIR && DB_SR)
				    				{
				    					WE_LSC = true;
				    					type= 33;
				    					CumulativeOR_SC = CumulativeOR_SC || WE_LSC;
				    				}
				    			}

				    			//sub-level 9:
				    			boolean TWA_LSC;
				    			TWA_LSC = false;
				    			if (!(HBright || HVis || CumulativeOR_SC))
				    			{
				    				if (LNDVI && DB_SR)
				    				{
				    					if (NIR > 23)   //20-22
				    					{
				    						TWA_LSC = true;
				    						type = 15;           //   浑浊水体和建筑体混淆，revised
				    						CumulativeOR_SC = CumulativeOR_SC || TWA_LSC;
				    					}
				    					else {
				    						TWA_LSC = true;
				    						type = 34;
				    						CumulativeOR_SC = CumulativeOR_SC || TWA_LSC;
				    					}

				    				}
				    			}

				    			//sub-level 10:
				    			boolean EmptySU_LSC;
				    			EmptySU_LSC = false;
				    			boolean help = true;
				    			if (help && !(CumulativeOR_SC))
				    			{
				    				EmptySU_LSC = true;
				    				type = 35;
				    			}
				    	 } 
            
            
            
            
  
         pixel1=type;
         pixel2=128;
         pixel3=128;
         var pixel4=225;
         return [pixel1,pixel2,pixel3,pixel4];
        
        }
      });
        var end = new Date().getTime();
        C_time=end-start;

      
       raster_c.on('beforeoperations', function(event) {
        event.data.r = raster_c.get('r');
        event.data.g = raster_c.get('g');
        event.data.b = raster_c.get('b');
        event.data.name = raster_c.get('name');
        event.data.color =  raster_c.get('color');
      }); 
     
    var classify_1 = document.getElementById("CLASSIFY");
    classify_1.onclick = function classify() {
    	
       raster_c.set('r', r);
       raster_c.set('b', b);
       raster_c.set('g', g);
       raster_c.set('name',name);
       raster_c.set('color',color);
      raster_c.changed();

     var fenlei = new ol.layer.Image({
     	title: 'fenlei',
     	type: 'base',
     	source: raster_c
     });
    	map.addLayer(fenlei);
    }
    	var time = document.getElementById("TIME");
	time.onclick = function time_c(){
	  var extent=map.getView().calculateExtent(map.getSize());
      var json = {"NDVI":NDVI_time,
                  "NDBI":NDBI_time,
                  "NDWI":NDWI_time,
                  "HC":HC_time,
                  "C":C_time,
                  "name":name,
                  "color":color,
      			  "left":extent[0],
                  "top":extent[3],
                  "bottom":extent[1],
                  "right":extent[2]};
      var jsonstr = JSON.stringify(json);
      window.AndroidWebView.showInfoFromJs(jsonstr);
		}
	
    
	var layerSwitcher = new ol.control.LayerSwitcher({
        tipLabel: 'L鑼単ende' // Optional label for button
    });
    map.addControl(layerSwitcher);

})();
