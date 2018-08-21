package com.example.my_app;


import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.Context;
import android.content.DialogInterface;
import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.JsPromptResult;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebSettings.LayoutAlgorithm;
import android.webkit.WebView;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.TextView;

@SuppressLint({ "SetJavaScriptEnabled", "JavascriptInterface" })
public class MainActivity extends Activity {
	 public WebView webview;
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		webview=(WebView) findViewById(R.id.location_map);
		webview.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);//设置无边框
		   WebSettings setting = webview.getSettings();  
		   setting.setLayoutAlgorithm(LayoutAlgorithm.NARROW_COLUMNS);
		   setting.setUseWideViewPort(true);
		   setting.setLoadWithOverviewMode(true); 
		   setting.setJavaScriptEnabled(true);//支持js  
			webview.setWebChromeClient(new WebChromeClient(){
				@Override
				public boolean onJsPrompt(WebView view, String url, String message,
						String defaultValue, final JsPromptResult result) {
					// TODO Auto-generated method stub
					final View v=View.inflate(view.getContext(), R.layout.prompt_dialog, null);
					 ((TextView) v.findViewById(R.id.prompt_message_text)).setText(message);  
		                ((EditText) v.findViewById(R.id.prompt_input_field)).setText(defaultValue);  
		                AlertDialog.Builder b = new AlertDialog.Builder(view.getContext());  
		                b.setTitle("Prompt");  
		                b.setView(v);  
		                b.setPositiveButton(android.R.string.ok, new DialogInterface.OnClickListener() {  
		                    @Override  
		                    public void onClick(DialogInterface dialog, int which) {  
		                        String value = ((EditText) v.findViewById(R.id.prompt_input_field)).getText().toString();  
		                        result.confirm(value);  
		                    }  
		                });  
		                b.setNegativeButton(android.R.string.cancel, new DialogInterface.OnClickListener() {  
		                    @Override  
		                    public void onClick(DialogInterface dialog, int which) {  
		                        result.cancel();  
		                    }  
		                });  
		                b.create().show();  
		                return true;  
				}
				
			});
		  webview.loadUrl("file:///android_asset/examples/layerswitcher.html");
	      webview.addJavascriptInterface(new JsInterface(this), "AndroidWebView");
			
	}
	

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		// Inflate the menu; this adds items to the action bar if it is present.
		getMenuInflater().inflate(R.menu.main, menu);
		return true;
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		// Handle action bar item clicks here. The action bar will
		// automatically handle clicks on the Home/Up button, so long
		// as you specify a parent activity in AndroidManifest.xml.
		int id = item.getItemId();
		if (id == R.id.action_settings) {
			return true;
		}
		return super.onOptionsItemSelected(item);
	}
	
	private class JsInterface{
		private Context mcontext;
		public JsInterface(Context context) {
			// TODO Auto-generated constructor stub
			this.mcontext=context;
		}
	
			
		   //在js中调用window.AndroidWebView.showInfoFromJs(name)，便会触发此方法。  
	        @JavascriptInterface  
	        public void showInfoFromJs(String json) throws JSONException {  
	        	JSONObject mJson = new JSONObject(json);
	        	System.out.println("checked");
	        	String NDVI =mJson.optString("NDVI");
	        	String NDBI =mJson.optString("NDBI");
	        	String NDWI =mJson.optString("NDWI");
	        	String HC_TIME = mJson.optString("HC");
	        	String C_TIME = mJson.optString("C");
	        	String top = mJson.optString("top");
	        	String bottom = mJson.optString("bottom");
	        	String left = mJson.optString("left");
	        	String right = mJson.optString("right");
	            System.out.println(" NDVI " + NDVI);  
	            System.out.println(" NDBI " + NDBI); 
	            System.out.println(" NDWI " + NDWI); 
	            System.out.println(" HC_TIME " + HC_TIME); 
	            System.out.println(" C_TIME " + C_TIME);
	            System.out.println(" top " + top); 
	            System.out.println(" left " + left);
	            System.out.println(" right " + right); 
	            System.out.println(" bottom " + bottom);
	        }  
	    }
	
}
	
