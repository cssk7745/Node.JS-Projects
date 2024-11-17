const crypto = require('crypto');
const readline = require('readline');


const secretKey = crypto.randomBytes(32); 
const iv = crypto.randomBytes(16); 

//encryption 
function encrypt(text) {
  const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return { encryptedData: encrypted, iv: iv.toString('hex') };
}

// decryption
function decrypt(encryptedData, ivHex) {
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    secretKey,
    Buffer.from(ivHex, 'hex')
  );
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// user input 
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


rl.question('Enter the message to encrypt: ', (message) => {
  const encrypted = encrypt(message);
  console.log("\nEncrypted Message:");
  console.log(encrypted.encryptedData);

  const decryptedMessage = decrypt(encrypted.encryptedData, encrypted.iv);
  console.log("\nDecrypted Message:");
  console.log(decryptedMessage);

  
  rl.close();
});
