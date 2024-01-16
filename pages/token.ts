export default async function getToken() {
    return (await (await fetch("/api/token", { method: "GET" })).text()) as string;
}