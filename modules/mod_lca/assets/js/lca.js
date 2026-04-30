/**
* @Copyright Copyright (C) 2014 - JoniJnm.es
* @license GNU/GPL http://www.gnu.org/copyleft/gpl.html
**/

var lca = {
	months_opened: [],
	years_opened: [],
	open: function(n, id, modid) {
		var a = "lca_"+modid+"_"+n+"a_"+id;
		if (typeof(document.getElementById(a).src) == 'undefined')
			document.getElementById(a).innerHTML = LCA_TEXT_EXPAND;
		else
			document.getElementById(a).src = LCA_IMG_EXPAND;
		var t = "lca_"+modid+"_"+n+"t_"+id;
		var type = n == 0 ? "year" : "month";
		document.getElementById(t).className = "lca lca_"+type+"_title lca_active";
	},
	close: function(n, id, modid) {
		var a = "lca_"+modid+"_"+n+"a_"+id;
		if (typeof(document.getElementById(a).src) == 'undefined')
			document.getElementById(a).innerHTML = LCA_TEXT_COLLAPSE;
		else
			document.getElementById(a).src = LCA_IMG_COLLAPSE;
		var t = "lca_"+modid+"_"+n+"t_"+id;
		var type = n == 0 ? "year" : "month";
		document.getElementById(t).className = "lca lca_"+type+"_title";
	},
	f: function(n, id, modid) {
		var li = "lca_"+modid+"_"+n+"_"+id;
		if (document.getElementById(li)) {
			if (document.getElementById(li).style.display == "none") {
				document.getElementById(li).style.display = "";
				document.cookie = 'lca'+modid+"_"+n+'='+id+";path=/";
				lca.open(n, id, modid);
			}
			else {
				document.getElementById(li).style.display = "none";
				document.cookie = 'lca'+modid+"_"+n+'=0;expires=0;path=/';
				lca.close(n, id, modid);
			}
		}
		if (!lca.months_opened[modid]) lca.months_opened[modid] = 0;
		if (!lca.years_opened[modid]) lca.years_opened[modid] = 0;
		var opened = n==1 ? lca.months_opened[modid] : lca.years_opened[modid];
		li = 'lca_'+modid+'_'+n+'_'+opened;
		if (document.getElementById(li) && ((n==1 && lca.months_opened[modid] != id) || (n!=1 && lca.years_opened[modid] != id))) {
			document.getElementById(li).style.display = "none";
			lca.close(n, opened, modid);
		}
		if (n == 1)
			lca.months_opened[modid] = id;
		else
			lca.years_opened[modid] = id;
	},
	onLoad: function(func) {
		if (window.addEventListener) window.addEventListener("load", func, false);
		else if (window.attachEvent) window.attachEvent("onload", func);
		else (func)();
	}
};
