export default defineEventHandler(async (event) => {
    var myHeaders = new Headers();
    myHeaders.append("uversion", "2");
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "loginName": "oboard2232442466",
        "password": "45977E064B593F32120B82C095BF5423",
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
