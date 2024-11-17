const crypto = require('crypto');
const readline = require('readline');

// Secret key (must be 32 bytes for 'aes-256-cbc')
const secretKey = crypto.randomBytes(32); // For production, securely generate and store this key
const iv = crypto.randomBytes(16); // Initialization vector (16 bytes for 'aes-256-cbc')

// Function to encrypt text
function encrypt(text) {
  const cipher = crypto.createCipheriv('aes-256-cbc', secretKey, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return { encryptedData: encrypted, iv: iv.toString('hex') };
}

// Function to decrypt encrypted text
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

// Set up a readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Ask the user for a message
rl.question('Enter the message to encrypt: ', (message) => {
  const encrypted = encrypt(message);
  console.log("\nEncrypted Message:");
  console.log(encrypted.encryptedData);

  // Decrypt the message and display it
  const decryptedMessage = decrypt(encrypted.encryptedData, encrypted.iv);
  console.log("\nDecrypted Message:");
  console.log(decryptedMessage);

  // Close the readline interface
  rl.close();
});
