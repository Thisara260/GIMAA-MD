const { smd, prefix, Config, sleep } = require('../lib');

smd({
    cmdname: "hack",
    type: "fun",
    info: "Ultimate hacker-style prank command",
    filename: __filename,
}, async (citel) => {

    const green = '```'; // Green monospace for WhatsApp/Telegram

    // Step 1: Start Hack
    await citel.send(`${green}Initializing Hack Sequence...${green}`);
    await sleep(1500);
    await citel.send(`${green}[✓] Connecting to Target Device...${green}`);
    await sleep(2000);
    await citel.send(`${green}[✓] Connection Established.${green}`);
    await sleep(1500);

    // Step 2: Inject Malware Packets
    await citel.send(`${green}Injecting Malware Packets...${green}`);
    await sleep(2000);

    // Step 3: Fake Progress Bar
    let percent = 0;
    while (percent < 100) {
        let jump = Math.floor(Math.random() * 15) + 5;
        percent += jump;
        if (percent > 100) percent = 100;
        await citel.send(`${green}[${'█'.repeat(Math.floor(percent / 10))}] ${percent}%${green}`);
        await sleep(Math.floor(Math.random() * 1500) + 500);
    }

    // Step 4: Fake IP & Geolocation
    const fakeIP = `${Math.floor(Math.random()*256)}.${Math.floor(Math.random()*256)}.${Math.floor(Math.random()*256)}.${Math.floor(Math.random()*256)}`;
    const fakeLocation = ["New York, USA","London, UK","Tokyo, Japan","Berlin, Germany","Sydney, Australia"];
    const location = fakeLocation[Math.floor(Math.random() * fakeLocation.length)];

    await citel.send(`${green}[✓] System Hijack Completed.${green}`);
    await sleep(1500);
    await citel.send(`${green}Target IP: ${fakeIP}${green}`);
    await sleep(1000);
    await citel.send(`${green}Geolocation: ${location}${green}`);
    await sleep(1500);

    // Step 5: Fake Data Dump
    await citel.send(`${green}Retrieving Sensitive Data...${green}`);
    await sleep(2000);
    const fakeData = [
        "Email: target123@example.com",
        "Password: ********",
        "Token: xYz123AbC",
        "CreditCard: 4111-xxxx-xxxx-1234"
    ];
    for (let data of fakeData) {
        await citel.send(`${green}${data}${green}`);
        await sleep(1000);
    }

    // Step 6: Finish
    await citel.send(`${green}Encrypting Logs & Wiping Evidence...${green}`);
    await sleep(2000);
    await citel.send(`${green}Hack Successful! Disconnecting...${green}`);
    await sleep(1500);
    await citel.send(`${green}✔ Mission Complete ✔${green}`);
});
