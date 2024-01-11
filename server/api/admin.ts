export default defineEventHandler(async (event) => {
    var myHeaders = new Headers();
    myHeaders.append("uversion", "2");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "loginName": "dgutpgadmin",
        "password": "7B83A4A1318A0EAEB752B69A5726741D",
        "device": "HUAWEI-HELL",
        "appVersion": "36",
        "webEnv": "1"
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
    };
    var res = await fetch("https://apps.ulearning.cn/login", requestOptions);
    var json = await res.json();
    return json.token;
})
