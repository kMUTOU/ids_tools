
/**
 * Ideographic Description Sequence Parser
 *
 * @author kMUTOU (MUTOU K) <ks.mutou@hotmail.co.jp>
 * @description IDS Normalization Tools
 * @version 0.1.0
 * @license Licensed under the MIT license
 * Copyright (c) 2018 MUTOU Keisuke
 *
 */

const twoComponentsIDC = [
    "⿰", "⿱", "⿴", "⿵", "⿶",
//    0x2FF0, 0x2FF1, 0x2FF4, 0x2FF5, 0x2FF6,
    "⿷", "⿸", "⿹", "⿺", "⿻"
//    0x2FF7, 0x2FF8, 0x2FF9, 0x2FFA, 0x2FFB
];

const threeComponentsIDC = [
    "⿲", "⿳"
//    0x2FF2, 0x2FF3
];

const CJK_IDEOGRAPHS_RANGE = [
    // CJK UNIFIED IDEOGRAPHS
    {"Range":[0x03400, 0x04D85], "BlockName":"CJK Unified Ideographs Extension A"},
    {"Range":[0x04E00, 0x09FCC], "BlockName":"CJK Unified Ideographs"},
    {"Range":[0x20000, 0x2A6D6], "BlockName":"CJK Unified Ideographs Extension B"},
    {"Range":[0x2A700, 0x2B734], "BlockName":"CJK Unified Ideographs Extension C"},
    {"Range":[0x2B740, 0x2B81D], "BlockName":"CJK Unified Ideographs Extension D"},
    {"Range":[0x2B820, 0x2CEA1], "BlockName":"CJK Unified Ideographs Extension E"},
    {"Range":[0x2CEB0, 0x2EBE0], "BlockName":"CJK Unified Ideographs Extension F"}, // from ISO/IEC 10646 5th

    // CJK COMPATIBILITY IDEOGRAPHS
    {"Range":[0x0F900, 0x0FAD9], "BlockName":"CJK Compatibility Ideographs"},
    {"Range":[0x2F800, 0x2FA1D], "BlockName":"CJK Compatibility Ideographs Supplement"}
];

const RADICALS_RANGE = [
    {"Range":[0x02E80, 0x02EF3], "BlockName":"CJK Radicals Supplement"},
    {"Range":[0x02F00, 0x02FD5], "BlockName":"Kangxi Radicals"}
];

/* ISO/IEC 10646:2014 Amd. 1 */
const IDC_RANGE = [
    {"Range":[0x02FF0, 0x02FFB], "BlockName":"Ideographic Description Character"}
];

const PUA_RANGE = [
    {"Range":[0x0E000, 0x0F800], "BlockName":"Private Use Area"},
    {"Range":[0xF0000, 0xFFFFE], "BlockName":"Private Use Plane 0F"},
    {"Range":[0x100000, 0x10FFFE], "BlockName":"Private Use Plane 10"}
];

/* ISO/IEC 10646 5th DIS */
const CJK_STROKES_RANGE = [
    {"Range":[0x031C0, 0x031E3], "BlockName":"CJK Strokes"}
];

/**
* Ideographic Description Sequence (IDS) Description Components (DC)
* 
* ISO/IEC 10646:2017 5th
* Annex I (informative) Ideographic description characters
* I.2 Syntax of an ideogprahic description sequences
* @const {Array} Array
*/
const IDS_DC_RANGE = [].concat(
    CJK_IDEOGRAPHS_RANGE,
    [{"Range":[0x0FF1F, 0x0FF1F], "BlockName":"FULLWIDTH QUESTION MARK"}],
    CJK_STROKES_RANGE,    // from ISO/IEC 10646 5th
    RADICALS_RANGE,
    IDC_RANGE,
    PUA_RANGE
    // and another IDS
);

const Canonical_List = [
    ["壬", "𡈼"],
    ["土", "士"],
    ["工", ""],
    ["八", "丷"],
    ["十", "𠂇"],
    ["几", "𠘧", "𠘨"],
    ["禾", "𥝌"],
    ["刊", "刋"],
    ["凢", "凣"],
    ["丁", "𠄐"],
    ["木", "朩", "𣎳"],
    ["月", "⺼", "", "", "", ""],
    ["戌", "戍"],
    ["盇", "𥁋"],
    ["凡", "卂", "𠁽"],
    ["牛", "𠂒"],
    ["肀", ""],
    ["畀", "𢌿"],
    ["夨", ""],
    ["里", ""],
    ["承", ""],
    ["冄", ""],
    ["另", "叧", "𠮠"],
    ["亏", "亐"],
    ["山", "屮"],
    ["臿", "𢆍"],
    ["羊", "𦍌"],
    ["眞", "真"],
    ["県", ""],
    ["抛", "拋"],
    ["日", "冃", "曰"],
    ["己", "巳", "㔾", "已"],
    ["本", "夲"],
    ["夾", "㚒"],
    ["⺈", "𠂉"],
    ["⺈", "刀", "𠂊"],
    ["内", "內"],
    ["丏", "丐"],
    ["厂", "丆"],
    ["一", "丶", "乀"],
    ["夬", ""],
    ["茲", "兹", "玆"],
    ["卉", "𠦃", "𠦄"],
    ["𦣝", "𦣞"],
    ["姫", "姬"],
    ["申", "𦥔"],
    ["电", ""],
    ["㬰", "臾"],
    ["萈", "莧"],
    ["冊", "册", "𠕁"],
    ["廾", "廾"],
    ["开", "幵", "𠦅"],
    ["并", "幷"],
    ["毎", "每"],
    ["黑", "黒"],
    ["熏", "𤋱"],
    ["東", "柬"],
    ["曽", "曾"],
    ["子", "孑"],
    ["乙", "𠃉"],
    ["㞋", "𠬝"],
    ["厄", "卮", "𢀴"],
    ["勳", "勲"],
    ["㠯", ""],
    ["攵", "夂", "夊"],
    ["市", "巿"],
    ["郷", "鄉"],
    ["匚", "匸"],
    ["先", "兂", "旡"],
    ["大", "犬"],
    ["大", "太"],
    ["免", "兔"],
    ["豕", "豖"],
    ["尢", "𡯁"],
    ["尢", "尤"],
    ["王", "玉"],
    ["刄", "刅"],
    ["刄", "刃"],
    ["叉", "㕚"],
    ["丈", "𠀋"],
    ["单", "単"],
    ["曳", "曵"],
    ["徴", "徵"],
    ["𡵉", "𡵂"],
    ["巛", "𡿧"],
    ["寜", "寧"],
    ["舃", "舄"],
    ["鳯", "鳳"],
    ["戋", "㦮", "𢦍"],
    ["焭", "煢"],
    ["㡳", "底"],
    ["奥", "奧"],
    ["粤", "粵"],
    ["𡭴", "𡭽", "𡮂"],
    ["篡", "簒"],
    ["吕", "呂"],
    ["𤰞", "卑"],
    ["虽", "𧈧"],
    ["肙", "䏍"],
    ["兖", "兗"],
    ["衮", "袞"],
    ["圖", "圗"],
    ["員", "貟"],
    ["黃", "黄"],
    ["菫", "堇"],
    ["堇", "𦰌"],
    ["𦰩", ""],
    ["隺", "寉"],
    ["争", "爭"],
    ["為", "爲"],
    ["口", ""],
    ["靑", "青"],
    ["昷", "𥁕"],
    ["同", ""],
    ["魚", "𩵋"],
    ["頼", "賴"],
    ["疐", "𤴡"],
    ["眾", "衆"],
    ["么", "幺"],
    ["壽", "夀"],
    ["友", "犮"],
    ["皐", "臯"],
    ["兔", "兎"],
    ["稟", "禀"],
    ["釆", "采"],
    ["爽", "𡙁"],
    ["廉", "亷"],
    ["正", "𤴔"],
    ["皀", "", "艮", "𠧢"],
    ["食", "飠", "𩙿"],
    ["象", "𧰼"],
    ["煕", "𤋮"],
    ["囱", "囪"],
    ["示", "礻"],
    ["示", "𤓯"],
    ["丬", "爿"],
    ["", "𧘇"],
    ["車", "𨊥"],
    ["业", ""],
    ["彐", "彑"],
    ["殻", "𣪊", "㱿"],
    ["冒", "冐"],
    ["畫", "畵"],
    ["俞", "兪"],
    ["専", "專"],
    ["恵", "惠"],
    ["晉", "晋"],
    ["缶", "𦈢", "𠙻"],
    ["羮", "羹"],
    ["帯", "带"],
    ["走", "赱"],
    ["𣴎", "羕"],
    ["羡", "羨"],
    ["亡", "亾", "兦"],
    ["网", "𦉳"],
    ["睿", "𥈠"],
    ["手", "龵"],
    ["乑", ""],
    ["歹", "歺"],
    ["嬴", "𡣍"],
    ["厂", "𠂆"],
    ["小", "忄", "𡭔"],
    ["冂", "冖", ""],
    ["冈", "罓"],
    ["卄", "艹"],
    ["卄", "廾"],
    ["口", "囗"],
    ["王", "𤣩"],
    ["竹", "𥫗"],
    ["牛", "牜"],
    ["糸", "糹"],
    ["言", "訁"],
    ["足", "𧾷"],
    ["䜌", "龻"],
    ["𠦝", "龺"],
    ["金", "釒"],
    ["卜", "⺊"],
    ["㐫", "㓙", "囟"],
    ["卥", "𠧧"],
    ["贛", "𥫔"],
    ["亇", "个"],
    ["寇", "𡨥"],
    ["帀", "币"],
    ["夅", "𡕘"],
    ["瓜", "𤓰"],
    ["𣎼", "𡥀"],
    ["𠬛", ""],
    ["婁", "𡝤"],
    ["与", ""],
    ["𦔮", "耴"],
    ["會", "㑹"],
    ["工", ""],
    ["㸚", "𠈌"],
    ["𢏚", ""],
    ["𠃬", ""],
    ["希", "𢁫"],
    ["龠", "𠎤"],
    ["由", "𠙹"],
    ["幺", "乡"],
    ["円", "丹"],
    ["厂", ""],
    ["又", ""],
    ["甚", "𫞪"],
    ["今", "𫝆"],
    ["", ""],
    ["冉", ""],
    ["𠂎", ""],
    ["", ""],
    ["", ""],
    ["𠀉", "", "", ""],
    ["亼", "", "亽", "𠓛"],
    ["丩", "𠂈"],
    ["厂", ""],
    ["卩", "龴", ""],
    ["止", "龰"],
    ["㐅", "乂"],
    ["", "𦣻"],
    ["永", "𣱵", "𣱳"],
    ["才", ""],
    ["彐", "⺕", ""],
    ["甾", "𠚋"],
    ["𦬇", "𦬠"],
    ["𦍋", "芈", "羋"],
    ["二", "𠄠", "𠄟", "𠄞"],
    ["", "⺂"],
    ["日", "臼", "𦥑"],
    ["丨", "丿"],
    ["龶", "主"],
    ["土", "𠀆"],
    ["", ""],
    ["𠃍", "乛"],
    ["𠃍", "𠃌"],
    ["兀", "丌"],
    ["乚", "𠃊"],
    ["廿", "龷"],
    ["冫", "⺀"],
    ["九", "丸", ""],
    ["且", "旦"],
    ["毋", "母"],
    ["人", "入", "𠆢"],
    ["𫶬", ""],
    ["", "甫"],
    ["𡿨", ""],
    ["耴", "𦔮"]
];



/**
 * @exports IDS
 * 
 * @param {string} ids 
 * @return {object} 
 * @constructor
 */
export class IDO {

    constructor(ids) {
        this.ids = ids || "";
        this.twoComponentsIDC = twoComponentsIDC;
        this.threeComponentsIDC = threeComponentsIDC;
    }

   /**
    * 入力された文字のUCS符号位置が指定のレンジブロックに含まれるか確認を行うメソッド
    *
    * @param {string} input - 
    * @param {*} range - 
    */
   static isInCodeRange(input, range) {
        let ret = false;

        for (let i = 0; i < range.length; i++) {
            let block = range[i];

            if (input >= block.Range[0] && input <= block.Range[1])
                ret = (arguments[2] == "Name") ? block.BlockName : true;
        }
        return ret;
    }


    /**
     * 入力された文字のUCS符号位置がIdeographic Description Character
     * であるか確認を行うメソッド
     * 
     * @param {string} char - 
     * @return {boolean} ret -
     */
    isIDC(s) {
        let code = 0;
        switch(typeof s) {
            case 'number':
                code = s;
                break;
            case 'string':
                code = Number(s.codePointAt(0));
                break;
        }
        return (code >= 0x2FF0 && code <= 0x2FFB) ? true : false;
    }

    /**
     * 入力されたオブジェクトがIDOオブジェクトであるか確認を行うメソッド
     * 
     * @param {ido} ido Ideogprahic Description Object 
     * @return {boolean} 
     */
    isIDO(ido) {
        let ret = true;

        ido = ido || this.ido;

        // idcプロパティがない または dcプロパティの値がIDCでない。
        if ( !ido.idc || !this.isIDC(ido.idc) ) {
            ret = false;
            return ret;
        }

        // dcプロパティがない。 dcプロパティの値がArrayでない。
        if ( !ido.dc || !Array.isArray(ido.dc) ) {
            ret = false;
            return ret;
        }

        ido.dc.forEach( (dc_elem) => {
            if (typeof(dc_elem) == 'string')
                ret = ret && IDO.isInCodeRange(dc_elem, IDS_DC_RANGE);
            else
                ret = ret && this.isIDO(dc_elem);
        });

        return ret;
    }

    /**
     * 入力されたオブジェクトがIDOオブジェクトであるかLeaf IDOであるか確認を行うメソッド
     * 
     * @param {ido} ido Ideogprahic Description Object 
     * @return {boolean} 
     */
    isLeafIDO(ido) {
        let ret = false;

        ido = ido || this.ido;

        if (!this.isIDO(ido))
            return ret;

        let dc = ido.dc.filter(s => typeof(s) == "string");

        if (dc.length == ido.dc.length)
            ret = true;

        return ret;
    }

    /**
     * 入力されたIDSを解析して、IDOを返すメソッド
     * 
     * @param {string} ids IDS String
     * @return {boolean} 
     */
    parseIDS(ids) {
        // ids = this.ids = (ids !== undefined) ? ids : this.ids;
        ids = ids || this.ids;

        if (ids === undefined) {
            return null;
        }

        let isIDC = this.isIDC;
        const twoComponentsIDC = this.twoComponentsIDC;
        const threeComponentsIDC = this.threeComponentsIDC;

        let isIDS = (arr) => {
            let ret = true;
            if (twoComponentsIDC.indexOf(arr[0]) != -1 && arr.length == 3) {
                arr = arr.slice(1, 3);
            } else if (threeComponentsIDC.indexOf(arr[0]) != -1 && arr.length == 4) { 
                arr = arr.slice(1, 4);
            } else {
                ret = false;
                return ret;
            }

            arr.forEach( (d) => { ret = ( ((isIDC(d) === false) || (d instanceof(Object))) ? true : false ) && ret; });

            return ret;
        };

        let recur = (char_arr) => {
            let len = char_arr.length;

            for (let i = 0; i < char_arr.length - 2; i++) {
                if (i < char_arr.length - 2) {
                    if (twoComponentsIDC.indexOf(char_arr[i]) != -1 && isIDS(char_arr.slice(i, i+3)) ) {
                        char_arr[i] = {
                            'idc': char_arr[i], 
                            'dc':[ char_arr[i+1], char_arr[i+2] ]
                        };
                        char_arr.splice(i + 1, 2);
                    }
                }

                if (i < char_arr.length - 3) {
                    if (threeComponentsIDC.indexOf(char_arr[i]) != -1 && isIDS(char_arr.slice(i, i+4)) ) {
                        char_arr[i] = {
                            'idc': char_arr[i], 
                            'dc':[ char_arr[i+1], char_arr[i+2], char_arr[i+3] ]
                        };
                       char_arr.splice(i + 1, 3);
                    }
                }
            }

            if (char_arr.length == 1) {
                return char_arr[0];
            } else {
                if (len == char_arr.length)
                    throw new Error("Invalid Ideogprahic Description Sequences");
                return recur(char_arr);
            }
        };


        let input = [ ];

        for (let c of ids) {
            input.push(c);
        }

        this.ido = recur(input);

        return this.ido;
    }

    /**
     * Convert Ideographic Description Object to IDS
     * 
     * @return {string} s
     */
    toIDS(ido) {

        ido = ido || this.ido;

        let recursiveParse = (node) => {
            return node.idc + (node.dc).map( (subNode) => {
                if (typeof(subNode) == 'string')
                    return subNode;
                else if (subNode.dc !== undefined)
                    return rec(subNode);
            }).join("");
        };

        function rec(node) {
            return node.idc + (node.dc).map( (subNode) => {
                if (typeof(subNode) == 'string')
                    return subNode;
                else if (subNode.dc !== undefined)
                    return rec(subNode);
            }).join("");
        }

        return recursiveParse(ido);
    }

}



import {IDO_DATA} from './IDOData';

export class IDONorm extends IDO {

    constructor(ids) {
        super(ids);
    }


    /**
     * Normalize IDS String.
     * Return Normalized IDS tree.
     *  // ⿰AB => ⿰AB
        // ⿱AB => ⿱AB
        // ⿲ABC => ⿰A⿰BC
        // ⿳ABC => ⿱A⿱BC
        // ⿱AB => ⿱AB
        // ⿴AB => ⿴AB
        // ⿵AB => ⿱AB
        // ⿶AB => ⿱BA
        // ⿷AB => ⿰AB
        // ⿸AB => ⿰AB
        // ⿹AB => ⿱AB
        // ⿺AB => ⿱AB

     * @param {object} ido Ideographic Description Object
     * @return {object} ido transformed Ideographic Description Object
     */
    structure(ido) {
        ido = ido || this.ido;

        if (ido.idc === undefined)
            return ido;

        if (['⿷','⿺'].includes(ido.idc))
            ido.idc = '⿰';
        else if (['⿵','⿸','⿹'].includes(ido.idc)) 
            ido.idc = '⿱';

        // ⿲ABC => ⿰A⿰BC
        switch (ido.idc) {
            case '⿲':
                ido.idc = '⿰';
                ido.dc[1] = {'idc': '⿰', 'dc':[ido.dc[1], ido.dc[2]]};
                ido.dc.splice(2);
                break;
            case '⿳':
                ido.idc = '⿱';
                ido.dc[1] = {'idc': '⿱', 'dc':[ido.dc[1], ido.dc[2]]};
                ido.dc.splice(2);

                break;
            case '⿶':
                ido.idc = '⿱';
                ido.dc = [ido.dc[1], ido.dc[0]]
                break;
            default:
                // pass
        }
        return ido;
    }

    /**
     * 
     * @param {Object} ido - Ideogprahic Description Object
     * @return {Object} ido - canonicalized Ideogprahic Description Object
     */
    canonicalize(ido) {
        ido = ido || this.ido;

        ido.dc = ido.dc.map( (dc_chars) => {
            let candidate = [];
            Canonical_List.forEach( (c_list) => {
                if (typeof(dc_chars) == 'string') {
                    if (c_list.includes(dc_chars)) {
                        candidate = candidate.concat(c_list);
                    }
                }
                else if (Array.isArray(dc_chars)) {
                    dc_chars.forEach( (char) => {
                        if (c_list.includes(char)) 
                            candidate = candidate.concat(c_list);
                    });
                }
            });
            return (candidate.length !== 0) ? Array.from(new Set(candidate)) : dc_chars;
        });

        return ido;
    }

    /**
     * IDSを回転させて、等価な構造に変形するロジック 
     * 
     * type: left (default)
     *   ⿰⿰ABC => ⿰A⿰BC, ⿱⿱ABC => ⿱A⿱BC, ⿴⿴ABC => ⿴A⿴BC
     * 
     * type: quad
     *   ⿱⿰AB⿰CD => ⿰⿱AC⿱BD, ⿰⿱AB⿱CD => ⿱⿰AC⿰BD
     *
     * type: right
     *   ⿰A⿰BC => ⿰⿰ABC, ⿱A⿱BC => ⿱⿱ABC, ⿴A⿴BC => ⿴⿴ABC
     * 
     * type: overlay
     *   ⿻AB => ⿻BA
     *
     * @param {Object} ido - input Ideogprahic Description Object
     * @param {String} type - rotation type (left / right / overlay / quad)
     * @return {Object} ido - rotated Ideographic Description Object
     */
   rotate(ido, type) {
        type = (type !== undefined) ? type : "left";
        ido = ido || this.ido;

        if (ido.idc === undefined)
            return ido;

        switch (type) {

            // IDC OVERLAY  Swap the left and right one.
            // i.e. ⿻AB => ⿻BA
            case "overlay":
                if (ido.idc == "⿻")
                    ido.dc = [ido.dc[1], ido.dc[0]]; 
                break;

            // Rotate Left/Upper to Right/Down
            // e.g. ⿱⿱ABC => ⿱A⿱BC
            case "right":
                if (ido.idc == ido.dc[0].idc) {
                    ido.dc = [
                        ido.dc[0].dc[0], 
                        {"idc":ido.idc, "dc":[ido.dc[0].dc[1], ido.dc[1]]}
                    ];
                }
                break;

            // ⿰⿱AB⿱CD
            case "quad":
                if ( (ido.dc[0].idc !== undefined && ido.dc[1].idc !== undefined) &&
                    ["⿰","⿱"].includes(ido.dc[0].idc) && (ido.dc[0].idc == ido.dc[1].idc) &&
                    ["⿰","⿱"].includes(ido.idc) && (ido.dc[0].idc != ido.idc)) {
                    ido = {
                        "idc": ido.dc[0].idc,
                        "dc":[
                            {"idc": ido.idc, "dc": [ido.dc[0].dc[0], ido.dc[1].dc[0]]},
                            {"idc": ido.idc, "dc": [ido.dc[0].dc[1], ido.dc[1].dc[1]]}
                        ]
                    };
                }
                break;

            // Rotate Right/Down to Left/Upper
            // e.g. ⿱A⿱BC => ⿱⿱ABC
            case "left":
            default:
                if (ido.idc == ido.dc[1].idc) {
                    ido.dc = [
                        {"idc":ido.idc, "dc":[ido.dc[0], ido.dc[1].dc[0]]},
                        ido.dc[1].dc[1]
                    ];
                }
        }

        return ido;
    }

    /**
     * decompose left character to IDO
     * e.g. ⿱䒤十 => ⿱⿱艹日十 => ⿱艹早
     * @method
     * @param {Object} ido - Ideographic Description Object
     * @return {Object} ido - Decomposed Ideographic Description Object
     */
    decomp(ido) {
        ido = ido || this.ido;

        /* decompose Left Character */
        if (typeof(ido.dc[0]) == 'string') {
            for (let i = 0; i < IDO_DATA.data.length; i++) {
                if (ido.dc[0] == IDO_DATA.data[i].utf8) {
                    ido.dc[0] = IDO_DATA.data[i].ido;
                    continue;
                }
            }
        } else if (Array.isArray(ido.dc[0])) {
            let tmp = [];
            ido.dc[0].forEach( (dc) => {
                for (let i = 0; i < IDO_DATA.data.length; i++) {
                    if (dc == IDO_DATA.data[i].utf8) {
                        tmp.push(IDO_DATA.data[i].ido);
                        continue;
                    }
                }

                // merge tmp array => object;
                // とりあえず
                if (tmp.length !== 0) {
                    if (tmp[0].idc == '⿻')
                        return ido;
                    else
                        ido.dc[0] = tmp[0];
                } else {
                    return ido;
                }
            });
        } else {
            return ido;
        }

        /* rotate */
        // rotate right ⿱[䒤]十 => ⿱[⿱艹日]十 => ⿱艹[⿱日十]
        ido = this.rotate(ido, "right");

        // compose right dc
        if (ido.dc[1].idc !== undefined) {
            // compose right one ⿱艹[⿱日十] => ⿱艹早
            ido.dc[1] = this.comp(ido.dc[1]);
        }
        return ido;
    }

    /**
     * compose left character to IDO
     * 
     * 2017-06-02 ⿻ABで(⿻AB or ⿻BA)を検索するロジックを追加
     * 
     * e.g. ⿱日十 => 早
     * @param {Object} ido - Ideographic Description Object 
     * @return {Object} ido - Composed Ideographic Description Object 
     */
    comp(partIdo) {
        partIdo = partIdo || this.ido;

        let chars = (IDO_DATA.data).filter((d) => {
            return compare(partIdo, d.ido);
        }).map( (char) => { return char.utf8; });

        if (chars.length === 0) {
            switch (partIdo.idc) {
                case "⿻": 
                    // partIdoの.idcが⿻である場合は、⿻ABを⿻BAにして、再度探索する。
                    /* 本来は、⿻ABで(⿻AB or ⿻BA)を検索可能であるべきだが、現状のロジックだととても面倒なので、このようにしておく*/
                    chars = chars.concat(IDO_DATA.data.filter(λ => compare(this.rotate(partIdo, "overlay"), λ.ido)).map(λ => λ.utf8));
                    break;
                case "⿱":
                case "⿰":
                    chars = chars.concat(IDO_DATA.data.filter(λ => compare(this.rotate(partIdo, "quad"), λ.ido)).map(λ => λ.utf8));
                    break;
                default:
                    // pass
            }
        }

        if (chars.length !== 0) {
            let candidate = [];
            Canonical_List.forEach( (c_list) => {
                chars.forEach( (char) => {
                    if (c_list.includes(char)) 
                        candidate = candidate.concat(c_list);
                });
            });
            // Setを利用して、重複を除外する。重複を除きたいだけで、Set使う必要はない。
            chars = (candidate.length !== 0) ? Array.from(new Set(chars.concat(candidate))) : chars;
        }

        return (chars.length !== 0) ? chars : partIdo;
    }


    shrinkCore(ido) {
        let tmp = {};

        ido = ido || this.ido;

        if (Array.isArray(ido) || typeof(ido) == 'string')
            return ido;

        // recursive struct
        ido = recursion(this.structure, ido);
        // recursive canon
        ido = recursion(this.canonicalize, ido);

        // 一度 Composeする
        tmp = this.comp(ido);

        // Composeできない場合は、Rotation Leftをする。
        if (compare(tmp, ido)) {
            ido = this.rotate(ido);
            // Rotation Leftの場合のみ、DC NodeをCompose
            tmp = {
                'idc': ido.idc,
                'dc': ido.dc.map( (dc_c) => (dc_c.idc !== undefined) ? this.comp(dc_c) : dc_c )
            };

            // Rotation Leftをして、Composeできない場合は、Right
            if (compare(tmp, ido)) {
                ido = this.rotate(ido, "right");
                tmp = this.comp(ido);

                // Rotation Rightをして、Composeできない場合は、Decomposeを実行する
                if (compare(tmp, ido)) {
                    tmp = this.decomp(tmp);
                }
            }
        }

        if (Array.isArray(tmp) || typeof(tmp) == 'string')
            return tmp;

        // find UCS values which is Array.
        if (tmp.dc !== undefined) {
           return {
               "idc": tmp.idc,
                "dc": tmp.dc.map( (dc_char) => (dc_char.idc !== undefined) ? this.shrinkCore(dc_char) : dc_char )
            };
        }
        else
            return tmp;
    }

    shrink(ido, prev) {
        ido = ido || this.ido;

        let curr = {};
        Object.assign(curr, ido);

        let ido_out = this.shrinkCore(ido);

        if (prev !== undefined && compare(ido_out, prev)) {
            return prev;
        }

        // 縮退を実行して、StringもしくはArray型になったらその値を返す。
        if (typeof(ido_out) == 'string' || Array.isArray(ido_out)) {
            this.ido = ido_out;
            return ido_out;
        } else {
            return this.shrink(ido_out, curr);
        }

    }

}

/**
 * 与えられたfunctionを再帰的に実行する
 * @param {function} func 再帰的に実行する関数
 * @param {IDO} IDO Ideographic Description Object
 * @return {IDO} appliedIDO 
 */
function recursion(func, ido) {
    "use strict";

    if (Array.isArray(ido) || typeof(ido) == 'string')
        return ido;
    else
        ido = func.call({}, ido);

    return {
        'idc': ido.idc,
        'dc': ido.dc.map( (dc_char) => (dc_char.idc !== undefined) ? recursion(func, dc_char) : dc_char )
    };
}

/**
 * 二つのIdeographic Description Objectが等価であるか、判定する。
 * 
 * @param {Object} inputIdo - 比較する入力IDO
 * @param {Object} targetIdo - 比較するIDO ArrayのObject
 * @return {boolean} - 比較結果
 */

function compare(inputIdo, targetIdo) {
    "use strict";

    let dc1 = inputIdo.dc, dc2 = targetIdo.dc;
    if (inputIdo.idc !== targetIdo.idc)
        return false;

    if (dc1.length !== dc2.length)
        return false;

    for (let i = 0; i < dc1.length; i++) {
        // FULL WIDTH QUESTION ？が含まれる場合は、passする。
        if ( (Array.isArray(dc1[i]) && dc1[i].includes("？")) || (typeof(dc1[i]) == 'string' && dc1[i] == "？") ) {
            // Pass
        } else if (Array.isArray(dc1[i]) && Array.isArray(dc2[i])) {
            if (!dc2[i].reduce( (char, p) => { return dc1[i].includes(char) || p; }, false))
                return false;
        } else if (Array.isArray(dc1[i]) && typeof(dc2[i]) == 'string') {
            if (!dc1[i].includes(dc2[i]))
                return false;
        } else if (typeof(dc1[i]) == 'string' && Array.isArray(dc2[i])) {
            if (!dc2[i].includes(dc1[i]))
                return false;
        } else if (typeof(dc1[i]) == 'string' && typeof(dc2[i]) == 'string') {
            if (dc1[i] != dc2[i])
                return false;
        } else {
            if (compare(dc1[i], dc2[i]) === false)
                return false;
        }
    }

    // 一連の操作の結果、falseにならなければ、trueを返す。
    return true;
}

