export let verified = false;
export function setVerified(value: boolean) {
    verified = value;
}
export default async function getToken() {
    return (await (await fetch("/api/token", { method: "GET" })).text()) as string;
}