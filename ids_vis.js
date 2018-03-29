/**
 * Ideographic Description Tree Layouting and IDS Parser
 * 
 * @author: kMUTOU (MUTOU K) <ks.mutou@hotmail.co.jp>
 * @version: 0.1.0
 * @license: Licensed under the MIT license
 * Copyright (c) 2018 MUTOU Keisuke
 */
"use strict";
import {IDO_DATA} from './IDOData';
import {IDO, IDONorm} from './ids_parser';

function color(i) {
	let ret = "white";
	switch (i) {
		case 0:
			ret = "bisque";
			break;
		case 1:
			ret = "lightgreen";
			break;
		case 2:
			ret = "lightsalmon";
			break;
		default:
	}
	return ret;
}

function calc_dc(parentNode, code) {
	let dc_style_wh = [];
	let pw = (parentNode.offsetWidth === 0) ? parseInt(parentNode.style.width.slice(0, -2)) : parentNode.offsetWidth,
		ph = (parentNode.offsetHeight === 0) ? parseInt(parentNode.style.height.slice(0, -2)) : parentNode.offsetHeight;

	switch (code) {
		case 0x2FF0:
			pw = pw / 2;
			ph = ph;
			dc_style_wh.push({width: `${pw.toString(10)}px`, height: `${ph.toString(10)}px`, "grid-row": "1 / 3", "grid-column": "1 / 2"});
			dc_style_wh.push({width: `${pw.toString(10)}px`, height: `${ph.toString(10)}px`, "grid-row": "1 / 3", "grid-column": "2 / 3"});
			break;
		case 0x2FF1:
			pw = pw;
			ph = ph / 2;
			dc_style_wh.push({width: `${pw.toString(10)}px`, height: `${ph.toString(10)}px`, "grid-row": "1 / 2", "grid-column": "1 / 2"});
			dc_style_wh.push({width: `${pw.toString(10)}px`, height: `${ph.toString(10)}px`, "grid-row": "2 / 3", "grid-column": "1 / 2"});
			break;
		case 0x2FF2:
			pw = pw / 3;
			ph = ph;
			dc_style_wh.push({width: `${pw.toString(10)}px`, height: `${ph.toString(10)}px`, "grid-row": "1 / 4", "grid-column": "1 / 2"});
			dc_style_wh.push({width: `${pw.toString(10)}px`, height: `${ph.toString(10)}px`, "grid-row": "1 / 4", "grid-column": "2 / 3"});
			dc_style_wh.push({width: `${pw.toString(10)}px`, height: `${ph.toString(10)}px`, "grid-row": "1 / 4", "grid-column": "3 / 4"});
			break;
		case 0x2FF3:
			pw = pw;
			ph = ph / 3;
			dc_style_wh.push({width: `${pw.toString(10)}px`, height: `${ph.toString(10)}px`, "grid-row": "1 / 2", "grid-column": "1 / 4"});
			dc_style_wh.push({width: `${pw.toString(10)}px`, height: `${ph.toString(10)}px`, "grid-row": "2 / 3", "grid-column": "1 / 4"});
			dc_style_wh.push({width: `${pw.toString(10)}px`, height: `${ph.toString(10)}px`, "grid-row": "3 / 4", "grid-column": "1 / 4"});
			break;
		case 0x2FF4:
			dc_style_wh.push({width: `${pw.toString(10)}px`, height: `${ph.toString(10)}px`, "grid-row": "1 / 7", "grid-column": "1 / 7"});
			pw = pw * 2/3;
			ph = ph * 2/3;
			dc_style_wh.push({width: `${pw.toString(10)}px`, height: `${ph.toString(10)}px`, "grid-row": "2 / 6", "grid-column": "2 / 6"});
			break;
		case 0x2FF5:
			dc_style_wh.push({width: `${pw.toString(10)}px`, height: `${ph.toString(10)}px`, "grid-row": "1 / 7", "grid-column": "1 / 7"});
			pw = pw * 2/3;
			ph = ph * 2/3;
			dc_style_wh.push({width: `${pw.toString(10)}px`, height: `${ph.toString(10)}px`, "grid-row": "3 / 7", "grid-column": "2 / 6"});
			break;
		case 0x2FF6:
			dc_style_wh.push({width: `${pw.toString(10)}px`, height: `${ph.toString(10)}px`, "grid-row": "1 / 7", "grid-column": "1 / 7"});
			pw = pw * 2/3;
			ph = ph * 2/3;
			dc_style_wh.push({width: `${pw.toString(10)}px`, height: `${ph.toString(10)}px`, "grid-row": "1 / 5", "grid-column": "2 / 6"});
			break;
		case 0x2FF7:
			dc_style_wh.push({width: `${pw.toString(10)}px`, height: `${ph.toString(10)}px`, "grid-row": "1 / 7", "grid-column": "1 / 7"});
			pw = pw * 2/3;
			ph = ph * 2/3;
			dc_style_wh.push({width: `${pw.toString(10)}px`, height: `${ph.toString(10)}px`, "grid-row": "2 / 6", "grid-column": "3 / 7"});
			break;
		case 0x2FF8:
			dc_style_wh.push({width: `${pw.toString(10)}px`, height: `${ph.toString(10)}px`, "grid-row": "1 / 4", "grid-column": "1 / 4"});
			pw = pw * 2/3;
			ph = ph * 2/3;
			dc_style_wh.push({width: `${pw.toString(10)}px`, height: `${ph.toString(10)}px`, "grid-row": "2 / 4", "grid-column": "2 / 4"});
			break;
		case 0x2FF9:
			dc_style_wh.push({width: `${pw.toString(10)}px`, height: `${ph.toString(10)}px`, "grid-row": "1 / 4", "grid-column": "1 / 4"});
			pw = pw * 2/3;
			ph = ph * 2/3;
			dc_style_wh.push({width: `${pw.toString(10)}px`, height: `${ph.toString(10)}px`, "grid-row": "2 / 4", "grid-column": "1 / 3"});
			break;
		case 0x2FFA:
			dc_style_wh.push({width: `${pw.toString(10)}px`, height: `${ph.toString(10)}px`, "grid-row": "1 / 4", "grid-column": "1 / 4"});
			pw = pw * 2/3;
			ph = ph * 2/3;
			dc_style_wh.push({width: `${pw.toString(10)}px`, height: `${ph.toString(10)}px`, "grid-row": "1 / 3", "grid-column": "2 / 4"});
			break;
		case 0x2FFB:
			pw = pw * 2/3;
			ph = ph * 2/3;
			dc_style_wh.push({width: `${pw.toString(10)}px`, height: `${ph.toString(10)}px`, "grid-row": "1 / 5", "grid-column": "1 / 5"});
			dc_style_wh.push({width: `${pw.toString(10)}px`, height: `${ph.toString(10)}px`, "grid-row": "3 / 7", "grid-column": "3 / 7"});
			break;
	}

	return dc_style_wh;
}

class IdeographSplitter {

	constructor(conf) {
		this.conf = conf;
		this.IDO_DATA = IDO_DATA;

		this.idc_dnd({
			"draggable":["div.idc", "span.col"],
			"droppable":["div.droppable"]
		});

		let saba = {
			"idc":"⿰", "dc":["魚", "青"]
		};
		this.Ido2HTML(saba);
	}

	/**
	 * Ideographic Description ObjectからHTML DOMを生成する。
	 * @param {Object} IDO {'idc':"", dc:[]}
	 * @param {String} parent - specify the parent node  
	 */
	Ido2HTML(IDO, parentNode=undefined) {
		parentNode = (parentNode) ? parentNode : document.getElementById(this.conf.TARGET_FIELD);

		let childIdcNode = document.createElement("div");
		childIdcNode.setAttribute("class", `idc u${IDO.idc.codePointAt(0).toString(16)}`);
		childIdcNode.dataset.type = "idc";

		if (parentNode.offsetWidth === 0 || parentNode.offsetHeight === 0) {
			childIdcNode.style.width = parentNode.style.width;
			childIdcNode.style.height = parentNode.style.height;
		} else {
			childIdcNode.style.width = parentNode.offsetWidth.toString(10) + "px";
			childIdcNode.style.height = parentNode.offsetHeight.toString(10) + "px";
		}

		let dc_style_wh = calc_dc(parentNode, IDO.idc.codePointAt(0));

		IDO.dc.forEach( (dc_elem, num) => {
			// div tagを作成する
			let div = document.createElement("div");
			div.dataset.type = "dc";
			dc_style_wh[num]['background-color'] = color(num);
			div.style.cssText = Object.entries(dc_style_wh[num]).map( (b) => b.join(": ")).join("; ");
			["dc", `d${num}`].forEach( c => div.classList.add(c) );
			childIdcNode.appendChild(div);

			if (typeof(dc_elem) === 'string') {
				let w = parseInt(dc_style_wh[num].width.slice(0, -2)),
					h = parseInt(dc_style_wh[num].height.slice(0, -2));

				let img = document.createElement("img");
				img.draggable = true;
				img.classList.add("col");
				img.width = w;
				img.height = h;

				let data = "";
				if (dc_elem.codePointAt(0) > 0xE800 && dc_elem.codePointAt(0) < 0xFE00) {
					let retRecord = (this.IDO_DATA.data).find( rec => rec.utf8 == dc_elem );
					data = retRecord.note.toLowerCase();
				} else {
					data = "u" + dc_elem.codePointAt(0).toString(16);
				}
				img.dataset.char = dc_elem;

				let url = `http://glyphwiki.org/glyph/${data}.svg`;
				let getData = fetch(url, {mode: 'cors'}).then(res => res.text() );

				getData
					.then( (ret) => {
						let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");

						//let parser = new DOMParser();
						let dom = (new DOMParser()).parseFromString(ret, "image/svg+xml");
						let path = dom.getElementsByTagName("path")["0"];

						path.setAttribute("transform", `scale(${w / 200}, ${h / 200})`);
						svg.appendChild(path);
						let svgText = new XMLSerializer().serializeToString(svg);
						img.src = "data:image/svg+xml;base64," + btoa(svgText);
					})
					.catch( (err) => console.error(err) );

				// Double Clickで分解できるように、Eventを追加する。
				img.addEventListener("dblclick", (e) => {
					let parent = e.target.parentNode;
					let d = this.getIdo(e.target.dataset.char, parent);	// If nodeName is IMG,
					if (d !== null)
						parent.removeChild(parent.firstChild);
				});
				img.addEventListener("dragstart", (e) => {
					e.target.style.opacity = "0.75";
					e.dataTransfer.effectAllowed = "move";
					e.dataTransfer.setData("text/plain", e.target.dataset.char);
				});
				img.addEventListener("contextmenu", (e) => {
					if (e.preventDefault)
						e.preventDefault();
					e.target.remove();
				});

				div.appendChild(img);
			} else {
				this.Ido2HTML(dc_elem, div);
			}
		});

		parentNode.appendChild(childIdcNode);
	}

	/**
	 * HTMLにレンダリングされているDOMからIdeographic Description Object(IDO)を生成する。
	 * @param {DOM} node 
	 * @param {Object} ido - {'idc':"", dc:[]}  
	 */
	parseIdoDOM(node) {
		if (!node) {
			return {};
		} else if (node.nodeName == "IMG") {
			return node.dataset.char;
		} else {
			let ido = {idc: null, dc: []};

			if (node.nodeName == "DIV" && node.dataset.type == "idc") {
				ido.idc = String.fromCodePoint(parseInt(node.className.slice(5), 16));
			}

			node.childNodes.forEach( (dc_node) => {
				if (dc_node.firstChild === null && dc_node.innerText === "") {
					ido.dc.push("？");
				} else if (dc_node.firstChild.nodeName == "IMG") {
					ido.dc.push(dc_node.firstChild.dataset.char);
				} else {
					ido.dc.push(this.parseIdoDOM(dc_node.firstChild));
				}
			});

			return ido;
		}
	}

	/**
	 * character (char)に対応するIdeographic Description Sequence(IDS)情報から、
	 * Ideographic Description Objectを生成・分解し, HTML DOMに変換後レンダリングを行う。
	 * @param {String} char -
	 * @param {HTMLElement} parent -
	 */
	getIdo(chars, parent=undefined) {
		const idoParser = new IDO();
		switch (chars.length) {
			case 1:	// BMP character
			case 2: // SIP character
				let retRecord = (this.IDO_DATA.data).find( rec => rec.utf8 == chars );

				if (retRecord === undefined)
					return null;
				else if (retRecord.ido == retRecord.utf8)
					return null;
				else {
					idoParser.parseIDS(retRecord.ids);
					this.Ido2HTML(idoParser.ido, parent);
				}
				break;
			default: 
				try {
					idoParser.parseIDS(chars);
					this.Ido2HTML(idoParser.ido);
				} catch (e) {
					console.error("IDO Error");
				}
		}
	}

	/**
	 * character (char)に対応するIdeographic Description Sequence(IDS)情報から、
	 * @param {String} char - 
	 * @param {HTMLElement} parent - 
	 */
	renderChar(char) {

		if (char.length > 2) {
			console.error("A length of character must be ONE or TWO.");
			return;
		}

		// ワイルドカードを表現する文字コードを許容する。
		if (char == "？" || char == "*") {
			this.char2HTML(char);
			return;
		}

		// 入力されたcharが、IDO_DATAに含まれるか確認をする。
		let retRecord = (this.IDO_DATA.data).find( rec => rec.utf8 == char );
		if (retRecord.length !== 0) {
			this.char2HTML(char);
			return;
		}
		else {
			console.error("Unkown Character.");
			return;
		}
	}

	/**
	 * Ideographic Description ObjectからHTML DOMを生成する。
	 * @param {String} char - character
	 */
	char2HTML(char) {
		let data = "";

		let root = document.getElementById("target_character");

		let img = document.createElement("img");
		img.draggable = true;
		img.classList.add("col");
		img.width = root.offsetWidth - 2;
		img.heifht = root.offsetHeight - 2;

		if (char.codePointAt(0) > 0xE000 && char.codePointAt(0) < 0xF900) {
			let retRecord = (this.IDO_DATA.data).find( rec => rec.utf8 == char );
			data = retRecord.note.toLowerCase();
		} else {
			data = "u" + char.codePointAt(0).toString(16);
		}

		img.src = `http://glyphwiki.org/glyph/${data}.svg`;
		img.dataset.char = char;
		
		img.addEventListener("dblclick", (e) => {
			let parent = e.target.parentNode;
			let d = this.getIdo(e.target.dataset.char, parent);	// If nodeName is IMG,
			if (d !== null)
				parent.removeChild(parent.firstChild);
		});
		img.addEventListener("dragstart", (e) => {
			e.target.style.opacity = "0.75";
			e.dataTransfer.effectAllowed = "move";
			e.dataTransfer.setData("text/plain", e.target.dataset.char);
		});
		img.addEventListener("contextmenu", (e) => {
			if (e.preventDefault)
				e.preventDefault();
			e.target.remove();
		});

		// target_characterに追加
		root.appendChild(img);
	}

	/**
	 * IDCパレットによりDrag&Dropができる様にする。
	 */
	idc_dnd(classes) {

		function handleDragStart(e) {
			e.target.style.opacity = "0.75";
			e.dataTransfer.effectAllowed = "move";
			if (e.target.nodeName == 'IMG')
				e.dataTransfer.setData("text/plain", e.target.dataset.char);
			else
				e.dataTransfer.setData("text/plain", e.target.innerHTML);
		}

		function handleDragEnd(e) {
			e.target.parentNode.classList.remove("over");
		}

		function handleDragEnter(e) {
			e.target.parentNode.classList.add("over");
		}

		function handleDragLeave(e) {
			e.target.parentNode.classList.remove("over");
		}

		function handleDragOver(e) {
			if (e.preventDefault)
				e.preventDefault();

			e.dataTransfer.dropEffect = "move";
			return false;
		}

		function handleDrop(e) {
			let subNode;
			let char = e.dataTransfer.getData("text/plain").codePointAt(0);

			if (e.stopPropagation)
				e.stopPropagation();
			e.preventDefault();

			let data = "u" + char.toString(16);
			let dc_style_wh = calc_dc(e.target, char);

			if (char >= 0x2FF0 && char <= 0x2FFB) {
				subNode = document.createElement("div");
				subNode.setAttribute("class", `idc ${data}`);
				subNode.dataset.type = "idc";
				let dc_len = (data == "u2ff2" || data == "u2ff3") ? 3 : 2;
				for (let i = 0; i < dc_len; ++i) {
					let div = document.createElement("div");
					div.dataset.type = "dc";
					dc_style_wh[i]['background-color'] = color(i);
					dc_style_wh[i].border = "solid 1px";
					div.style.cssText = Object.entries(dc_style_wh[i]).map( (b) => b.join(": ")).join("; ");
					["dc", "droppable", `dc${i}`].forEach( c => div.classList.add(c) );
					subNode.appendChild(div);
				}
			} else {
				subNode = document.createElement("img");

				// CDP外字の場合は、URLが異なるので、dataを書き換える。
				if (char > 0xE000 && char < 0xF900) {
					let retRecord = (this.IDO_DATA.data).find( rec => rec.utf8 == String.fromCodePoint(char));
					data = retRecord.note.toLowerCase();
				}

				let url = `http://glyphwiki.org/glyph/${data}.svg`;
				let getData = fetch(url, {mode: 'cors'}).then(res => res.text() );
		
				getData
					.then( (ret) => {
						let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		
						//let parser = new DOMParser();
						let dom = (new DOMParser()).parseFromString(ret, "image/svg+xml");
						let path = dom.getElementsByTagName("path")["0"];
		
						path.setAttribute("transform", `scale(${e.target.offsetWidth / 200}, ${e.target.offsetHeight / 200})`);
						svg.appendChild(path);
						let svgText = new XMLSerializer().serializeToString(svg);
						subNode.src = "data:image/svg+xml;base64," + btoa(svgText);
					})
					.catch( (err) => console.error(err) );

				subNode.setAttribute("class", "col");
				subNode.dataset.type = "dc";
				subNode.dataset.char = String.fromCodePoint(char);
				// img widthとheightをここで設定

				subNode.width = e.target.offsetWidth - 2;
				subNode.height = e.target.offsetHeight - 2;

				//　右クリックで要素を削除する。
				subNode.addEventListener("contextmenu", (e) => {
					if (e.preventDefault)
						e.preventDefault();
					
					let parentNode = e.target.parentNode;
					parentNode.classList.add("droppable");
					parentNode.addEventListener("dragend", handleDragEnd, false);
					parentNode.addEventListener("dragover", handleDragOver, false);
					parentNode.addEventListener("drop", handleDrop, false);
				
					// DOMを削除
					e.target.remove();
				}, false);

			} // end of else

			// 子ノードのdc droppableにEventListenerを追加する.
			subNode.querySelectorAll("div.droppable").forEach( (dp) => {
				dp.addEventListener("dragend", handleDragEnd, false);
				dp.addEventListener("dragover", handleDragOver, false);
				dp.addEventListener("drop", handleDrop, false);
			});
			// 子ノードをtargetに追加する.
			e.target.appendChild(subNode);

			// targetのclassListからdroppableを除くことにより、dropをできないようにする。
			e.target.classList.remove("droppable");
			e.target.removeEventListener("dragend", handleDragEnd, false);
			e.target.removeEventListener("dragover", handleDragOver, false);
			e.target.removeEventListener("drop", handleDrop, false);
			return false;
		}

		classes.draggable.forEach( (selector) => {
			document.querySelectorAll(selector).forEach( (d) => {
				d.addEventListener("dragstart", handleDragStart, false);
				d.addEventListener("dragend", handleDragEnd, false);
				d.addEventListener("dragenter", handleDragEnter, false);
				d.addEventListener("dragover", handleDragOver, false);
				d.addEventListener("dragleave", handleDragLeave, false);
			});	
		})

		classes.droppable.forEach( (selector) => {
			document.querySelectorAll(selector).forEach( (d) => {
				d.addEventListener("dragend", handleDragEnd, false);
				d.addEventListener("dragover", handleDragOver, false);
				d.addEventListener("drop", handleDrop, false);
			});
		});

	}
}

const idoNorm = new IDONorm();

let conf = {
	TARGET_FIELD: "target_character"
};
let ids = new IdeographSplitter(conf);

/**
 * target fieldを消す
 */
let targetClear = document.getElementById("target_clear");
targetClear.addEventListener("click", () => {
	let idoDom = document.getElementById("target_character");
	document.getElementById("ido_data").innerText = "";

	if (idoDom.firstChild !== undefined)
		idoDom.removeChild(idoDom.firstChild);
}, false);

targetClear = document.getElementById("search_clear");
targetClear.addEventListener("click", () => {
	let idoDom = document.getElementById("search_area");
	if (idoDom.firstChild !== undefined) {
		idoDom.removeChild(idoDom.firstChild);
		idoDom.classList.add("droppable");
		ids.idc_dnd({
			"draggable":["div.idc", "span.col"],
			"droppable":["div.droppable"]
		});

	}
}, false);


/**
 * target fieldに表示されているDOMからIDOを生成する。
 */
document
	.getElementById("toIDS")
		.addEventListener("click", () => {
			let ido = ids.parseIdoDOM(document.getElementById("target_character").firstChild);
			idoNorm.ido = ido;
			document.getElementById("ido_data").innerText = idoNorm.toIDS();
		});

document
	.getElementById("searchIDS")
		.addEventListener("click", () => {
			let ido = ids.parseIdoDOM(document.getElementById("search_area").firstChild);
			idoNorm.ido = ido;
			document.getElementById("ido_data").innerText = idoNorm.toIDS();
		});


document
	.getElementById("search")
		.addEventListener("click", () => {
			let ido = ids.parseIdoDOM(document.getElementById("search_area").firstChild);
			idoNorm.ido = ido;
			let find = idoNorm.shrink();

			if (Array.isArray(find) && find.length > 0) // 検索結果が見つかった場合
				document.getElementById("results").innerHTML = '<ul>' + 
					find.map((c) => `<li>${c} U+${c.codePointAt(0).toString(16).toUpperCase()}</li>`).join('\n') + 
					'</ul>';
			else if (typeof find === 'string')
				document.getElementById("results").innerHTML = 
					`<ul><li>${find} U+${find.codePointAt(0).toString(16).toUpperCase()}</li></ul>`;
			else　// 検索結果が見つからなかった場合
				document.getElementById("results").innerHTML = '<p>Not Found</p>';
		});
	
document
	.getElementById("char_split")
		.addEventListener("click", () => {
			let char = document.getElementById("char").value;
			let target = document.getElementById("target_character");
			if (target.firstChild !== null)
				target.removeChild(target.firstChild);
			ids.getIdo(char);
		});

document
	.getElementById("char_call")
		.addEventListener("click", () => {
			let char = document.getElementById("char").value;
			let target = document.getElementById("target_character");
			if (target.firstChild !== null)
				target.removeChild(target.firstChild);
			
			ids.renderChar(char);
		});
