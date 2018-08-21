(function() {
	
		    var layer1 = new ol.source.ImageWMS({
	        		crossOrigin:'Anonymous',
                   ratio: 1,
          url: 'http://101.71.255.28:8080/geoserver/reflence/wms',
          params: {'FORMAT': "image/png",
                   'VERSION': '1.1.1',  
                STYLES: '',
                   LAYERS: 'reflence:l8_1_r'
                   }
                   });    
           var layer2 = new ol.source.ImageWMS({
	        		crossOrigin:'Anonymous',
                   ratio: 1,
                   url: 'http://101.71.255.28:8080/geoserver/reflence/wms',
                   params: {
                   	'FORMAT': "image/png",
                   'VERSION': '1.1.1',
                   STYLES: '',
                   LAYERS: 'reflence:l8_2_r'
                   }
                   });   
 		  var layer3 = new ol.source.ImageWMS({
	        		crossOrigin:'Anonymous',
                   ratio: 1,
                   url: 'http://101.71.255.28:8080/geoserver/reflence/wms',
                   params: {
                   	'FORMAT': "image/png",
                   'VERSION': '1.1.1',
                   STYLES: '',
                   LAYERS: 'reflence:l8_3_r'
                   }
                  }); 
    		  var layer4 = new ol.source.ImageWMS({
	        		crossOrigin:'Anonymous',
                   ratio: 1,
                   url: 'http://101.71.255.28:8080/geoserver/reflence/wms',
                   params: {
                   	'FORMAT': "image/png",
                   'VERSION': '1.1.1',
                   STYLES: '',
                   LAYERS: 'reflence:l8_4_r'
                   }
                   });   
    		  var layer5 = new ol.source.ImageWMS({
	        		crossOrigin:'Anonymous',
                   ratio: 1,
                   url: 'http://101.71.255.28:8080/geoserver/reflence/wms',
                   params: {
                   	'FORMAT': "image/png",
                   'VERSION': '1.1.1',
                   STYLES: '',
                   LAYERS: 'reflence:l8_5_r'
                   }
                   });  
    		  var layer6 = new ol.source.ImageWMS({
	        		crossOrigin:'Anonymous',
                   ratio: 1,
                   url: 'http://101.71.255.28:8080/geoserver/reflence/wms',
                   params: {
                   	'FORMAT': "image/png",
                   'VERSION': '1.1.1',
                   STYLES: '',
                   LAYERS: 'reflence:l8_6_r'
                   }
                   });  
    		  var layer7 = new ol.source.ImageWMS({
	        		crossOrigin:'Anonymous',
                   ratio: 1,
                   url: 'http://101.71.255.28:8080/geoserver/reflence/wms',
                   params: {
                   	'FORMAT': "image/png",
                   'VERSION': '1.1.1',
                   STYLES: '',
                   LAYERS: 'reflence:l8_7_r'
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
    						  new ol.layer.Image({
   				          	title: '5',
            				type: 'base',
            				source: layer5,
    						 }),
    						  new ol.layer.Image({
   				          	title: '6',
            				type: 'base',
            				source: layer6,
    						 }),
    						  new ol.layer.Image({
   				          	title: '7',
            				type: 'base',
            				source: layer7,
    						 }),
    						 drawLayer
            ],
        view: new ol.View({
          center: [120,30],
          zoom: 11,
          projection: 'EPSG:4326',
          resolution:0.00029784361
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
        sources: [layer1,layer2,layer3,layer4,layer5,layer6,layer7],
        operation: function(pixels, data) {
            var pixel1=pixels[0][0];
        	var pixel2=pixels[1][0];
        	var pixel3=pixels[2][0];
        	var pixel4=pixels[3][0];
        	var pixel5=pixels[4][0];
        	var pixel6=pixels[5][0];
        	var pixel7=pixels[6][0];
            var type;
				    		 var Bright;
				    		 var HBright,MBright,LBright;
				    		    HBright=false;
				    			MBright=false;
				    			LBright=false;
				    			Bright=((1/8.0)*( pixel1+pixel2+2*pixel3+2*pixel4+pixel5+pixel7));
				    		    if(Bright>60) HBright=true;
				    			else if (Bright>=40) MBright=true;
				    			else LBright=true;

				    			var Vis;
				    			var  HVis,MVis,LVis;
				    			HVis=false;
				    			MVis=false;
				    			LVis=false;
				    			Vis= ((1/3.0)*(pixel1+pixel2+pixel3));
				    		    if(Vis>50) HVis=true;
				    			else if (Vis>=30) MVis=true;
				    			else LVis=true;

				    			var NIR;
				    			var HNIR,MNIR,LNIR;
				    			HNIR=false;
				    			MNIR=false;
				    			LNIR=false;
				    			NIR=pixel4;
				    			if(NIR>60) HNIR=true;
				    			else if (NIR>=40) MNIR=true;
				    			else LNIR=true;

				    			var MIR1;
				    			var HMIR1,MMIR1,LMIR1;
				    			HMIR1=false;
				    			MMIR1=false;
				    			LMIR1=false;
				    			MIR1=pixel5;
				    			if(MIR1>60) HMIR1=true;
				    			else if (MIR1>=40) MMIR1=true;
				    			else LMIR1=true;

				    			var MIR2;
				    			var HMIR2,MMIR2,LMIR2;
				    			HMIR2=false;
				    			MMIR2=false;
				    			LMIR2=false;
				    			MIR2=pixel7;
				    			if(MIR2>50) HMIR2=true;
				    			else if (MIR2>=30) MMIR2=true;
				    			else LMIR2=true;

				    			var TIR;
				    			var HTIR,MTIR,LTIR;
				    			HTIR=false;
				    			MTIR=false;
				    			LTIR=false;
				    			TIR=pixel6;
				    			if(TIR>301) HTIR=true;
				    			else if (TIR>=273) MTIR=true;
				    			else LTIR=true;

				    			var MIRTIR;
				    			var HMIRTIR,MMIRTIR,LMIRTIR;
				    			HMIRTIR=false;
				    			MMIRTIR=false;
				    			LMIRTIR=false;
				    			MIRTIR=(255-MIR1)*TIR;
				    			if(MIRTIR>22000) HMIRTIR=true;
				    			else if (MIRTIR>=18000) MMIRTIR=true;
				    			else LMIRTIR=true;

				    		    var NDVI;
				    			var HNDVI,MNDVI,LNDVI;
				    			HNDVI=false;
				    			MNDVI=false;
				    			LNDVI=false;
				    			NDVI=((pixel4-pixel3)/(pixel4+pixel3+0.001));
				    			if(NDVI>0.70) HNDVI=true;
				    			else if (NDVI>=0.36) MNDVI=true;
				    			else LNDVI=true;
				    		    
				    		    var NDBSI;
				    			var HNDBSI,MNDBSI,LNDBSI;
				    			HNDBSI=false;
				    			MNDBSI=false;
				    			LNDBSI=false;
				    			NDBSI=((pixel5-pixel4)/(pixel5+pixel4+0.001));
				    			if(NDBSI>0.10) HNDBSI=true;
				    			else if (NDBSI>=-0.20) MNDBSI=true;
				    			else LNDBSI=true;

				    		    var NDSI;
				    			var HNDSI,MNDSI,LNDSI;
				    			HNDSI=false;
				    			MNDSI=false;
				    			LNDSI=false;
				    			NDSI=((Vis-pixel5)/(Vis+pixel5+0.001));
				    			if(NDSI>0.50) HNDSI=true;
				    			else if (NDSI>=0.00) MNDSI=true;
				    			else LNDSI=true;

				    		    var NDBBBI;
				    			var HNDBBBI,MNDBBBI,LNDBBBI;
				    			HNDBBBI=false;
				    			MNDBBBI=false;
				    			LNDBBBI=false;
				    			NDBBBI=NDSI;
				    			if(NDBBBI>0.10) HNDBBBI=true;
				    			else if (NDBBBI>=-0.20) MNDBBBI=true;
				    			else LNDBBBI=true;

				    		//定义光谱规则，并判断单点规则属性
				    			var TKCL_SR, TNCL_SR, SNIC_SR, WASH_SR, PBGH_SR, DB_SR, V_SR, R_SR, BBC_SR, FBB_SR, SHB_SR, SHV_SR, SHCLSN_SR, WE_SR;
				    		    TKCL_SR=false;
				    			TNCL_SR=false;
				    			SNIC_SR=false;
				    			WASH_SR=false;
				    			PBGH_SR=false;
				    			DB_SR=false;
				    			V_SR=false;
				    			R_SR=false;
				    			BBC_SR=false;
				    			FBB_SR=false;
				    			SHB_SR=false;
				    			SHV_SR=false;
				    			SHCLSN_SR=false;
				    			WE_SR=false;

				    			if((Math.min(pixel1,pixel2,pixel3)>=0.7*Math.max(pixel1,pixel2,pixel3))
				    				 && (Math.max(pixel1,pixel2,pixel3)<=0.7*pixel4)
				    				 && (pixel5<=0.7*pixel4)
				    				 && (pixel5>=0.7*Math.max(pixel1,pixel2,pixel3)) && (pixel7 <=(0.7*pixel4)))
				    			TKCL_SR=true;

				    			if((pixel1<=pixel2)&&(pixel2<=pixel3)&&(pixel3<=pixel4)&&(pixel3>=0.7*pixel4))
				    				TNCL_SR=false;
				    			else if((Math.min(pixel1,pixel2,pixel3)>=0.7*Math.max(pixel1,pixel2,pixel3))
				    				     &&(pixel4>=Math.max(pixel1,pixel2,pixel3))
				    				     &&(pixel4>=0.7*pixel5) && (pixel5>=0.7*pixel4)
				    				     &&(pixel5>=0.7*Math.max(pixel1,pixel2,pixel3)) && (pixel5>=0.7*pixel7)
				    			        )
				    			        TNCL_SR=true;

				    			if((Math.min(pixel1,pixel2,pixel3)>=0.7*Math.max(pixel1,pixel2,pixel3))
				    				 && (pixel4>=Math.max(pixel1,pixel2,pixel3)) && (pixel5<=0.5*pixel4)
				    				 && (pixel5<=0.7*Math.min(pixel1,pixel2,pixel3)) && (pixel7<=0.5*pixel4)
				    				 && (pixel7<=0.7*Math.min(pixel1,pixel2,pixel3))
				    				)
				    				SNIC_SR=true;

				    			if((pixel1>=pixel2) && (pixel2>=pixel3)
				    				 && (pixel3>=pixel4) && (pixel4>=pixel5)
				    				 && (pixel4>=pixel7)
				    				)
				    				WASH_SR=true;

				    			if((pixel3>=0.7*pixel1) && (pixel1>=0.7*pixel3)
				    				&& (Math.max(pixel1,pixel2,pixel3)<=0.7*pixel4)
				    				&& (pixel5<=0.7*pixel4) && (pixel3>=0.5*pixel5)
				    				&& (Math.min(pixel1,pixel2,pixel3)>=0.7*pixel7)
				    				)
				    				PBGH_SR=true;

				    			if(pixel1>=0.7*Math.max(pixel2,pixel3,pixel4,pixel5,pixel7))
				    				DB_SR=true;

				    		    if((pixel2>=0.5*pixel1) && (pixel2>=0.7*pixel3)
				    				&& (pixel3<0.7*pixel4) && (pixel4>Math.max(pixel1,pixel2,pixel3))
				    				&& (pixel5<0.7*pixel4) && (pixel5>=0.7*pixel3)
				    				&& (pixel7<0.7*pixel5)
				    			   )
				    		       V_SR=true;

				    			if((pixel2>=0.5*pixel1) && (pixel2>=0.7*pixel3)
				    				&& (pixel3<0.7*pixel4) && (pixel4>Math.max(pixel1,pixel2,pixel3))
				    				&& (pixel4>=0.7*pixel5) && (pixel5>=0.7*pixel4)
				    				&& (pixel5>Math.max(pixel1,pixel2,pixel3)) && (pixel5>=pixel7)
				    				&& (pixel7<0.7*Math.max(pixel4,pixel5))
				    			   )
				    			   R_SR=true;

				    			if((pixel3>=0.5*pixel1) && (pixel3>=0.7*pixel2)
				    				&& (pixel4>=0.7*Math.max(pixel1,pixel2,pixel3)) && (pixel5>=0.7*pixel7)
				    				&& (pixel5>=Math.max(pixel1,pixel2,pixel3)) && (pixel5>=0.7*pixel4)
				    				&& (pixel7>=0.5*Math.max(pixel4,pixel5))
				    			   )
				    			   BBC_SR=true;

				    			if ((pixel5>=0.7*Math.max(pixel1,pixel2,pixel3,pixel4,pixel7))
				    				&&(Math.min(pixel1,pixel2,pixel3,pixel4,pixel7)>=0.5*pixel5)
				    				)
				    				FBB_SR=true;

				    			if((pixel1>pixel2)&&(pixel2>pixel3)
				    				&&(pixel3>=0.7*pixel4)&&(pixel1>=pixel5)
				    				&&(pixel5>=0.7*pixel4)&&(pixel5>=0.7*pixel7)
				    				)
				    				SHB_SR=true;

				    			if((pixel1>=pixel2)&&(pixel2>=pixel3)
				    				&&(pixel1>=0.5*pixel4)&&(pixel3<0.7*pixel4)
				    				&&(pixel5<0.7*pixel4)&&(pixel3>=0.7*pixel5)
				    				&&(pixel7<0.7*pixel4)
				    				)
				    				SHV_SR=true;

				    			if((pixel1>=0.7*Math.max(pixel2,pixel3,pixel4))
				    				&&(Math.max(pixel2,pixel3,pixel4)>=0.7*pixel1)
				    				&&(pixel5<pixel1)&&(pixel7<0.7*pixel1)
				    				)
				    				SHCLSN_SR=true;

				    			if((pixel1>=pixel2)&&(pixel2>=pixel3)&&(pixel1>=0.7*pixel4)
				    				&&(pixel3<pixel4)&&(pixel4>=0.7*pixel5)
				    				&&(pixel5>=0.7*pixel4)&&(pixel3>=0.5*pixel5)
				    				&&(pixel5>=pixel7)
				    				)
				    				WE_SR=true;

				    		//带层级的逻辑函数，定义类别；
				    			//定义一个累计类
				    			var CumulativeOR_SC=false;
				    		//sub-level 1:
				    			var CL_SC,SNIC_SC, WASH_SC,PB_SC;
				    			CL_SC=false;
				    			SNIC_SC=false;
				    			WASH_SC=false;
				    			PB_SC=false;

				    			if(TKCL_SR || TNCL_SR)
				    			{
				    				if(!(LBright||LVis||LNIR||HNDSI||LMIR1||LMIR2||HTIR||HMIRTIR))
				    				{
				    					CL_SC=true;
				    				    type=1;
				    				    CumulativeOR_SC=CumulativeOR_SC||CL_SC;
				    				}
				    			}		
				    			if(SNIC_SR && LNDBSI)
				    			{
				    				if(!(LBright||LVis||LNDSI||LNIR||HMIR1||HMIR2||HTIR||CumulativeOR_SC))
				    				{	
				    					SNIC_SC=true;
				    					type=2;
				    				    CumulativeOR_SC=CumulativeOR_SC||SNIC_SC;
				    				}
				    			}
				    			if (!(LTIR||CumulativeOR_SC))
				    			{
				    				if(WASH_SR && LBright && LVis && LNDVI && LNIR && LMIR1 && LMIR2)
				    				{
				    					WASH_SC=true;
				    					type=3;
				    				    CumulativeOR_SC=CumulativeOR_SC||WASH_SC;
				    				}
				    			}
				    			if(!(LNIR||CumulativeOR_SC))
				    			{
				    				if(PBGH_SR && LMIR1 && LMIR2 && LNDBSI)
				    				{
				    					PB_SC=true;
				    					type=4;
				    				    CumulativeOR_SC=CumulativeOR_SC||PB_SC;
				    				}
				    			}
				    		//sub-level 2:
				    			var TNCL_LSC,SN_LSC,TKCL_LSC,ICSN_LSC,DPWASH_LSC,SLWASH_LSC,PBHNDVI_LSC,PBMNDVI_LSC,PBLNDVI_LSC,SV_SC,AV_SC,WV_SC,SHR_LSC,AHR_LSC,DR_LSC,BBB_SC,SBB_SC,ABB_SC;
				    			TNCL_LSC=false;
				    			SN_LSC=false;
				    			TKCL_LSC=false;
				    			ICSN_LSC=false;
				    			DPWASH_LSC=false;
				    			SLWASH_LSC=false;
				    			PBHNDVI_LSC=false;
				    			PBMNDVI_LSC=false;
				    			PBLNDVI_LSC=false;
				    			SV_SC=false;
				    			AV_SC=false;
				    			WV_SC=false;
				    			SHR_LSC=false;
				    			AHR_LSC=false;
				    			DR_LSC=false;
				    			BBB_SC=false;
				    			SBB_SC=false;
				    			ABB_SC=false;

				    			if(CL_SC && LMIRTIR)
				    			{
				    				TKCL_LSC=true;
				    				type=5;
				    		        CumulativeOR_SC=CumulativeOR_SC||TKCL_LSC;
				    			}    
				    			if(CL_SC && MMIRTIR)
				    			{
				    				TNCL_LSC=true;
				    				type=6;
				    				CumulativeOR_SC=CumulativeOR_SC||TNCL_LSC;
				    			} 
				    			if(SNIC_SC && HNDSI)
				    			{
				    				SN_LSC=true;
				    				type=7;
				    				CumulativeOR_SC=CumulativeOR_SC||SN_LSC;
				    			} 
				    			if(SNIC_SC && MNDSI)
				    			{
				    				ICSN_LSC=true;
				    				type=8;
				    				CumulativeOR_SC=CumulativeOR_SC||ICSN_LSC;
				    			} 
				    			if(WASH_SC && HNDSI)
				    			{
				    				DPWASH_LSC=true;
				    				type=9;
				    				CumulativeOR_SC=CumulativeOR_SC||DPWASH_LSC;
				    			} 
				    			if((!HNDSI) && WASH_SC)
				    			{
				    				SLWASH_LSC=true;
				    				type=10;
				    		        CumulativeOR_SC=CumulativeOR_SC||SLWASH_LSC;
				    			}
				    			if(PB_SC)
				    			{
				    				if(HNDVI)
				    				{
				    					PBHNDVI_LSC=true;
				    					type=11;
				    				    CumulativeOR_SC=CumulativeOR_SC||PBHNDVI_LSC;
				    				}
				    				else if(MNDVI)
				    				{
				    					PBMNDVI_LSC=true;
				    					type=12;
				    				    CumulativeOR_SC=CumulativeOR_SC||PBMNDVI_LSC;
				    				}
				    				else if(LNDVI)
				    				{
				    					PBLNDVI_LSC=true;
				    					type=13;
				    				    CumulativeOR_SC=CumulativeOR_SC||PBLNDVI_LSC;
				    				}
				    			}
				    			if(!(HMIR1||HMIR2||HNDBSI||CumulativeOR_SC))
				    			{
				    				if(V_SR && HNDVI)
				    				{
				    					SV_SC=true;
				    					type=14;
				    				    CumulativeOR_SC=CumulativeOR_SC||SV_SC;
				    				}
				    			}
				    			if(!(HMIR1||HMIR2||HNDBSI||CumulativeOR_SC||DB_SR))
				    			{
				    				if((V_SR||SHV_SR) && MNDVI)
				    				{
				    					AV_SC=true;
				    					type=15;
				    				    CumulativeOR_SC=CumulativeOR_SC||AV_SC;
				    				}
				    			}
				    			if(!(CumulativeOR_SC||DB_SR))
				    			{
				    				if((V_SR||R_SR||SHV_SR) && LNDVI && LNDBSI && LMIR1 && LMIR2)
				    				{
				    					WV_SC=true;
				    					type=16;
				    		            CumulativeOR_SC=CumulativeOR_SC||WV_SC;
				    				}
				    			}
				    			if(!CumulativeOR_SC)
				    			{
				    				if(R_SR && HNDVI && HNDBSI)
				    				{
				    					SHR_LSC=true;
				    					type=17;
				    				    CumulativeOR_SC=CumulativeOR_SC||SHR_LSC;
				    				}
				    			}
				    			if(!CumulativeOR_SC)
				    			{
				    				if((R_SR||BBC_SR) && MNDVI && HNDBSI)
				    				{
				    					AHR_LSC=true;
				    					type=18;
				    				    CumulativeOR_SC=CumulativeOR_SC||AHR_LSC;
				    				}
				    			}
				    			if(!(HNIR||HMIR1||LNDBSI||CumulativeOR_SC))
				    			{
				    				if((V_SR||R_SR) && LNDVI && LMIR2)
				    				{
				    					DR_LSC=true;
				    					type=19;
				    		            CumulativeOR_SC=CumulativeOR_SC||DR_LSC;
				    				}
				    			}
				    			if(!(LNDBSI||LMIR1||CumulativeOR_SC))
				    			{
				    				if(BBC_SR && HNIR && HMIR2 && LNDVI)
				    				{
				    					BBB_SC=true;
				    					type=20;
				    				    CumulativeOR_SC=CumulativeOR_SC||BBB_SC;
				    				}
				    			}
				    			if(!(HNIR||LMIR1||CumulativeOR_SC))
				    			{
				    				if((BBC_SR||FBB_SR) && LNDVI && HNDBSI)
				    				{
				    					SBB_SC=true;
				    					type=21;
				    				    CumulativeOR_SC=CumulativeOR_SC||SBB_SC;
				    				}
				    				else if((BBC_SR||FBB_SR) && LNDVI && MNDBSI)
				    				{
				    					ABB_SC=true;
				    					type=22;
				    				    CumulativeOR_SC=CumulativeOR_SC||ABB_SC;
				    				}
				    			}

				    		//sub-level 3:
				    			var SVHNIR_LSC,SVLNIR_LSC,AVHNIR_LSC,AVLNIR_LSC,WVHNIR_LSC,SSR_SC,ASR_SC,BBBHTIR_SC,BBBLTIR_SC,SBBHTIR_SC,SBBLTIR_SC,ABBHTIR_SC,ABBLTIR_SC,DBB_SC;
				    			SVHNIR_LSC=false;
				    			SVLNIR_LSC=false;
				    			AVHNIR_LSC=false;
				    			AVLNIR_LSC=false;
				    			WVHNIR_LSC=false;
				    			SSR_SC=false;
				    			ASR_SC=false;
				    			BBBHTIR_SC=false;
				    			BBBLTIR_SC=false;
				    			SBBHTIR_SC=false;
				    			SBBLTIR_SC=false;
				    			ABBHTIR_SC=false;
				    			ABBLTIR_SC=false;
				    			DBB_SC=false;

				    			if(SV_SC)
				    			{
				    				if(HNIR)
				    				{
				    					SVHNIR_LSC=true;
				    					type=23;
				    				    CumulativeOR_SC=CumulativeOR_SC||SVHNIR_LSC;
				    				}
				    				else if(!HNIR)
				    				{
				    					SVLNIR_LSC=true;
				    					type=24;
				    				    CumulativeOR_SC=CumulativeOR_SC||SVLNIR_LSC;
				    				}		
				    			}
				    			if(AV_SC)
				    			{
				    				if(HNIR)
				    				{
				    					AVHNIR_LSC=true;
				    					type=25;
				    				    CumulativeOR_SC=CumulativeOR_SC||AVHNIR_LSC;
				    				}
				    				else if(!HNIR)
				    				{
				    					AVLNIR_LSC=true;
				    					type=26;
				    				    CumulativeOR_SC=CumulativeOR_SC||AVLNIR_LSC;
				    				}		
				    			}
				    			if(WV_SC && HNIR)
				    			{
				    				WVHNIR_LSC=true;
				    				type=27;
				    				CumulativeOR_SC=CumulativeOR_SC||WVHNIR_LSC;
				    			}
				    			if(!CumulativeOR_SC)
				    			{
				    				if(R_SR && HNDVI && MNDBSI)
				    				{
				    					SSR_SC=true;
				    					type=28;
				    				    CumulativeOR_SC=CumulativeOR_SC||SSR_SC;
				    				}
				    			}
				    			if(!(CumulativeOR_SC||SHV_SR||WE_SR))
				    			{
				    				if(R_SR && MNDVI && MNDBSI)
				    				{
				    					ASR_SC=true;
				    					type=29;
				    				    CumulativeOR_SC=CumulativeOR_SC||ASR_SC;
				    				}
				    			}
				    			if(BBB_SC)
				    			{
				    				if(HTIR)
				    				{
				    					BBBHTIR_SC=true;
				    					type=30;
				    				    CumulativeOR_SC=CumulativeOR_SC||BBBHTIR_SC;
				    				}
				    				else if(!HTIR)
				    				{
				    					BBBLTIR_SC=true;
				    					type=31;
				    				    CumulativeOR_SC=CumulativeOR_SC||BBBLTIR_SC;
				    				}		
				    			}
				    			if(SBB_SC)
				    			{
				    				if(HTIR)
				    				{
				    					SBBHTIR_SC=true;
				    					type=32;
				    				    CumulativeOR_SC=CumulativeOR_SC||SBBHTIR_SC;
				    				}
				    				else if(!HTIR)
				    				{
				    					SBBLTIR_SC=true;
				    					type=33;
				    				    CumulativeOR_SC=CumulativeOR_SC||SBBLTIR_SC;
				    				}		
				    			}
				    			if(ABB_SC)
				    			{
				    				if(HTIR)
				    				{
				    					ABBHTIR_SC=true;
				    					type=34;
				    				    CumulativeOR_SC=CumulativeOR_SC||ABBHTIR_SC;
				    				}
				    				else if(!HTIR)
				    				{
				    					ABBLTIR_SC=true;
				    					type=35;
				    				    CumulativeOR_SC=CumulativeOR_SC||ABBLTIR_SC;
				    				}		
				    			}
				    			if(!(HNIR||HMIR2||LNDBSI||CumulativeOR_SC))
				    			{
				    				if((BBC_SR||FBB_SR) && LNDVI && LMIR1)
				    				{
				    					DBB_SC=true;
				    					type=36;
				    					CumulativeOR_SC=CumulativeOR_SC||DBB_SC;
				    				}
				    			}

				    		//sub-level 4:
				    			var WVLNIR_LSC,SSRHNIR_LSC,ASRHNIR_LSC,ASRLNIR_LSC,BBBHTIRF_LSC,BBBLTIRF_LSC,SBBHTIRF_LSC,SBBLTIRF_LSC,ABBHTIRF_LSC,ABBLTIRF_LSC,DBBHTIR_SC,DBBLTIR_SC,WR_LSC,SSRLNIR_LSC;
				    		    WVLNIR_LSC=false;
				    			SSRHNIR_LSC=false;
				    			ASRHNIR_LSC=false;
				    			ASRLNIR_LSC=false;
				    			BBBHTIRF_LSC=false;
				    			BBBLTIRF_LSC=false;
				    			SBBHTIRF_LSC=false;
				    			SBBLTIRF_LSC=false;
				    			ABBHTIRF_LSC=false;
				    			ABBLTIRF_LSC=false;
				    			DBBHTIR_SC=false;
				    			DBBLTIR_SC=false;
				    			WR_LSC=false;
				    			SSRLNIR_LSC=false;

				    			if(!HNIR)
				    			{
				    				if(WV_SC)
				    				{
				    					WVLNIR_LSC=true;
				    					type=37;
				    				    CumulativeOR_SC=CumulativeOR_SC||WVLNIR_LSC;
				    				}
				    				else if(SSR_SC)
				    				{
				    					SSRLNIR_LSC=true;
				    					type=39;
				    		            CumulativeOR_SC=CumulativeOR_SC||SSRLNIR_LSC;
				    				}
				    				else if(ASR_SC)
				    				{
				    					ASRLNIR_LSC=true;
				    					type=41;
				    				    CumulativeOR_SC=CumulativeOR_SC||ASRLNIR_LSC;
				    				}		
				    			}
				    			if(HNIR)
				    			{
				    				if(SSR_SC)
				    				{
				    					SSRHNIR_LSC=true;
				    					type=38;
				    				    CumulativeOR_SC=CumulativeOR_SC||SSRHNIR_LSC;
				    				}
				    				else if(ASR_SC)
				    				{
				    					ASRHNIR_LSC=true;
				    					type=40;
				    				    CumulativeOR_SC=CumulativeOR_SC||ASRHNIR_LSC;
				    				}		
				    			}
				    			if(!LNDBBBI)
				    			{
				    				if(BBBHTIR_SC)
				    				{
				    					BBBHTIRF_LSC=true;
				    					type=42;
				    				    CumulativeOR_SC=CumulativeOR_SC||BBBHTIRF_LSC;
				    				}
				    				else if(BBBLTIR_SC)
				    				{
				    					BBBLTIRF_LSC=true;
				    					type=43;
				    				    CumulativeOR_SC=CumulativeOR_SC||BBBLTIRF_LSC;
				    				}
				    				else if(ABBHTIR_SC)
				    				{
				    					ABBHTIRF_LSC=true;
				    					type=46;
				    				    CumulativeOR_SC=CumulativeOR_SC||ABBHTIRF_LSC;
				    				}
				    				else if(ABBLTIR_SC)
				    				{
				    					ABBLTIRF_LSC=true;
				    					type=47;
				    				    CumulativeOR_SC=CumulativeOR_SC||ABBLTIRF_LSC;
				    				}
				    			}
				    			if(DB_SR||FBB_SR)
				    			{
				    				if(SBBHTIR_SC)
				    				{
				    					SBBHTIRF_LSC=true;
				    					type=44;
				    				    CumulativeOR_SC=CumulativeOR_SC||SBBHTIRF_LSC;
				    				}
				    				else if(SBBLTIR_SC)
				    				{
				    					SBBLTIRF_LSC=true;
				    					type=45;
				    				    CumulativeOR_SC=CumulativeOR_SC||SBBLTIRF_LSC;
				    				}		
				    			}
				    			if(DBB_SC)
				    			{
				    				if(HTIR)
				    				{
				    					DBBHTIR_SC=true;
				    					type=48;
				    				    CumulativeOR_SC=CumulativeOR_SC||DBBHTIR_SC;
				    				}
				    				else if(!HTIR)
				    				{
				    					DBBLTIR_SC=true;
				    					type=49;
				    				    CumulativeOR_SC=CumulativeOR_SC||DBBLTIR_SC;
				    				}		
				    			}
				    			if(R_SR && LNDVI)
				    			{
				    				if(!(LNDBSI||CumulativeOR_SC))
				    				{
				    					WR_LSC=true;
				    					type=50;
				    				    CumulativeOR_SC=CumulativeOR_SC||WR_LSC;
				    				}
				    			}

				    		//sub-level 5:
				    			var BBBHTIRNF_LSC,BBBLTIRNF_LSC,SBBHTIRNF_LSC,SBBLTIRNF_LSC,ABBHTIRNF_LSC,ABBLTIRNF_LSC,DBBHTIRF_LSC,DBBLTIRF_LSC,SHV_LSC;
				    			BBBHTIRNF_LSC=false;
				    			BBBLTIRNF_LSC=false;
				    			SBBHTIRNF_LSC=false;
				    			SBBLTIRNF_LSC=false;
				    			ABBHTIRNF_LSC=false;
				    			ABBLTIRNF_LSC=false;
				    			DBBHTIRF_LSC=false;
				    			DBBLTIRF_LSC=false;
				    			SHV_LSC=false;

				    			if(BBBHTIR_SC)
				    			{
				    				if(!BBBHTIRF_LSC)
				    				{
				    					BBBHTIRNF_LSC=true;
				    					type=51;
				    				    CumulativeOR_SC=CumulativeOR_SC||BBBHTIRNF_LSC;
				    				}
				    			}
				    			else if(BBBLTIR_SC)
				    			{
				    				if(!BBBLTIRF_LSC)
				    				{
				    					BBBLTIRNF_LSC=true;
				    					type=52;
				    				    CumulativeOR_SC=CumulativeOR_SC||BBBLTIRNF_LSC;
				    				}
				    			}

				    			if(SBBHTIR_SC)
				    			{
				    				if(!SBBHTIRF_LSC)
				    				{
				    					SBBHTIRNF_LSC=true;
				    					type=53;
				    				    CumulativeOR_SC=CumulativeOR_SC||SBBHTIRNF_LSC;
				    				}
				    			}
				    			else if(SBBLTIR_SC)
				    			{
				    				if(!SBBLTIRF_LSC)
				    				{	
				    					SBBLTIRNF_LSC=true;
				    					type=54;
				    				    CumulativeOR_SC=CumulativeOR_SC||SBBLTIRNF_LSC;
				    				}
				    			}

				    			if(ABBHTIR_SC)
				    			{
				    				if(!ABBHTIRF_LSC)
				    				{
				    					ABBHTIRNF_LSC=true;
				    					type=55;
				    				    CumulativeOR_SC=CumulativeOR_SC||ABBHTIRNF_LSC;
				    				}
				    			}
				    			else if(ABBLTIR_SC)
				    			{
				    				if(!ABBLTIRF_LSC)
				    				{
				    					ABBLTIRNF_LSC=true;
				    					type=56;
				    				    CumulativeOR_SC=CumulativeOR_SC||ABBLTIRNF_LSC;
				    				}
				    			}

				    			if(DB_SR||FBB_SR)
				    			{
				    				if(DBBHTIR_SC)
				    				{
				    					DBBHTIRF_LSC=true;
				    					type=57;
				    				    CumulativeOR_SC=CumulativeOR_SC||DBBHTIRF_LSC;
				    				}
				    				else if(DBBLTIR_SC)
				    				{
				    					DBBLTIRF_LSC=true;
				    					type=58;
				    				    CumulativeOR_SC=CumulativeOR_SC||DBBLTIRF_LSC;
				    				}		
				    			}

				    			if(!(HNDVI||CumulativeOR_SC))
				    			{
				    				if(DB_SR && SHV_SR && LBright && LVis && LNIR && LMIR1 && LMIR2)
				    				{
				    					SHV_LSC=true;
				    					type=59;
				    				    CumulativeOR_SC=CumulativeOR_SC||SHV_LSC;
				    				}
				    			}

				    		//sub-level 6:
				    			var DBBHTIRNF_LSC,DBBLTIRNF_LSC,SHB_LSC;
				    			DBBHTIRNF_LSC=false;
				    			DBBLTIRNF_LSC=false;
				    			SHB_LSC=false;

				    			if(DBBHTIR_SC)
				    			{
				    				if(!DBBHTIRF_LSC)
				    				{
				    					DBBHTIRNF_LSC=true;
				    					type=60;
				    				    CumulativeOR_SC=CumulativeOR_SC||DBBHTIRNF_LSC;
				    				}
				    			}
				    			else if(DBBLTIR_SC)
				    			{
				    				if(!DBBLTIRF_LSC)
				    				{
				    					DBBLTIRNF_LSC=true;
				    					type=61;
				    				    CumulativeOR_SC=CumulativeOR_SC||DBBLTIRNF_LSC;
				    				}
				    			}
				    			
				    			if(!(CumulativeOR_SC))
				    			{
				    				if(DB_SR && SHB_SR && LBright && LVis && LNDVI && LNIR && LMIR1 && LMIR2)
				    				{
				    					SHB_LSC=true;
				    					type=62;
				    		            CumulativeOR_SC=CumulativeOR_SC||SHB_LSC;
				    				}
				    			}

				    		//sub-level 7:
				    			var SHCL_LSC,TWASHSN_LSC;
				    			SHCL_LSC=false;
				    			TWASHSN_LSC=false;

				    			if(DB_SR && SHCLSN_SR)
				    			{
				    				if(!(HNDSI||LNIR||LBright||LVis||HNDBSI||HTIR||CumulativeOR_SC))
				    				{
				    					SHCL_LSC=true;
				    					type=63;
				    				    CumulativeOR_SC=CumulativeOR_SC||SHCL_LSC;
				    				}
				    			}

				    			if(!(LBright||LVis||HNDBSI||HTIR||CumulativeOR_SC))
				    			{
				    				if(DB_SR && SHCLSN_SR && HNDSI && LNIR && LMIR1 && LMIR2)
				    				{
				    					TWASHSN_LSC=true;
				    					type=64;
				    				    CumulativeOR_SC=CumulativeOR_SC||TWASHSN_LSC;
				    				}
				    			}

				    		//sub-level 8:
				    			var WE_LSC;
				    			WE_LSC=false;
				    			if(!(HNDVI||HNDBSI||LNDSI||CumulativeOR_SC))
				    			{
				    				if(DB_SR && WE_SR && LBright && LVis && LNIR && LMIR1 && LMIR2)
				    				{
				    					WE_LSC=true;
				    					type=65;
				    		            CumulativeOR_SC=CumulativeOR_SC||WE_LSC;
				    				}
				    			}

				    		//sub-level 9:
				    			var TWA_LSC;
				    			TWA_LSC=false;
				    			if(!(HBright||HVis||HTIR||LNDSI||CumulativeOR_SC ))
				    			{
				    				if(DB_SR && LNDVI && LMIR1 && LMIR2)
				    				{
				    					TWA_LSC=true;
				    					type=66;
				    		            CumulativeOR_SC=CumulativeOR_SC||TWA_LSC;
				    				}
				    			}

				    		//sub-level 10:
				    			var EmptySU_LSC;
				    			EmptySU_LSC=false;
				    			var help = true;
				    			if(help && !(CumulativeOR_SC))
				    			{
				    				EmptySU_LSC=true;
				    				type=67;
				    			}
				    	 
				    
				    	 
        // console.log(type);
         pixel1=type;
         pixel2=type;
         pixel3=type;
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
