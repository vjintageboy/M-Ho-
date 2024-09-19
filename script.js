let currentCipher = 'caesar';

// Hàm để lấy tham số từ URL
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

// Thiết lập loại mã hóa ban đầu dựa trên tham số URL
window.onload = function() {
    const cipherType = getUrlParameter('type');
    if (cipherType === 'substitution') {
        currentCipher = 'substitution';
        switchCipher('substitution');
    }
    
    // Ẩn hộp gợi ý khi trang được tải
    document.getElementById('floatingHint').style.display = 'none';
}

// Cập nhật hàm switchCipher
function switchCipher(cipherType) {
    currentCipher = cipherType;
    document.getElementById('caesarKeySection').style.display = 'none';
    document.getElementById('affineKeySection').style.display = 'none';
    document.getElementById('substitutionKeySection').style.display = 'none';
    document.getElementById('vigenereKeySection').style.display = 'none';
    document.getElementById('caesarButton').classList.remove('active');
    document.getElementById('affineButton').classList.remove('active');
    document.getElementById('substitutionButton').classList.remove('active');
    document.getElementById('vigenereButton').classList.remove('active');

    switch(cipherType) {
        case 'caesar':
            document.getElementById('title').innerText = "Mô Phỏng Mã Hóa Caesar Cipher";
            document.getElementById('caesarKeySection').style.display = 'block';
            document.getElementById('caesarButton').classList.add('active');
            break;
        case 'affine':
            document.getElementById('title').innerText = "Mô Phỏng Mã Hóa Affine Cipher";
            document.getElementById('affineKeySection').style.display = 'block';
            document.getElementById('affineButton').classList.add('active');
            break;
        case 'substitution':
            document.getElementById('title').innerText = "Mô Phỏng Mã Hóa Thay Thế";
            document.getElementById('substitutionKeySection').style.display = 'block';
            document.getElementById('substitutionButton').classList.add('active');
            break;
        case 'vigenere':
            document.getElementById('title').innerText = "Mô Phỏng Mã Hóa Vigenère Cipher";
            document.getElementById('vigenereKeySection').style.display = 'block';
            document.getElementById('vigenereButton').classList.add('active');
            break;
    }
}

// Cập nhật hàm encrypt và decrypt
function encrypt() {
    console.log("Encrypt function called");
    if (currentCipher === 'caesar') {
        encryptCaesar();
    } else if (currentCipher === 'affine') {
        encryptAffine();
    } else if (currentCipher === 'substitution') {
        encryptSubstitution();
    } else if (currentCipher === 'vigenere') {
        encryptVigenere();
    }
    checkAndShowHint(true);
}

function decrypt() {
    console.log("Decrypt function called");
    if (currentCipher === 'caesar') {
        decryptCaesar();
    } else if (currentCipher === 'affine') {
        decryptAffine();
    } else if (currentCipher === 'substitution') {
        decryptSubstitution();
    } else if (currentCipher === 'vigenere') {
        decryptVigenere();
    }
    checkAndShowHint(true);
}

// Hàm mã hóa Caesar Cipher
function encryptCaesar() {
    const key = parseInt(document.getElementById('caesarKey').value);
    const text = document.getElementById('text').value.toUpperCase();

    if (!text) {
        alert("Vui lòng nhập văn bản cần mã hóa!");
        return;
    }

    if (isNaN(key) || key < 1 || key > 25) {
        alert("Vui lòng nhập khóa hợp lệ (số từ 1 đến 25)!");
        return;
    }

    let ciphertext = '';

    // Mã hóa
    for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);
        if (charCode >= 65 && charCode <= 90) { // Chỉ mã hóa chữ cái
            ciphertext += String.fromCharCode(((charCode - 65 + key) % 26) + 65);
        } else {
            ciphertext += text[i]; // Giữ nguyên ký tự không phải chữ cái
        }
    }

    document.getElementById('text').value = ciphertext; // Hiển thị kết quả mã hóa trong ô nhập
    document.getElementById('output').innerText = "Kết quả mã hóa: " + ciphertext;
}

// Hàm giải mã Caesar Cipher
function decryptCaesar() {
    const key = parseInt(document.getElementById('caesarKey').value);
    const ciphertext = document.getElementById('text').value.toUpperCase();
    let plaintext = '';

    if (!ciphertext) {
        alert("Vui lòng nhập văn bản cần giải mã!");
        return;
    }

    if (isNaN(key) || key < 1 || key > 25) {
        alert("Vui lòng nhập khóa hợp lệ (số từ 1 đến 25)!");
        return;
    }

    // Giải mã
    for (let i = 0; i < ciphertext.length; i++) {
        const charCode = ciphertext.charCodeAt(i);
        if (charCode >= 65 && charCode <= 90) { // Chỉ giải mã chữ cái
            plaintext += String.fromCharCode(((charCode - 65 - key + 26) % 26) + 65);
        } else {
            plaintext += ciphertext[i]; // Giữ nguyên ký tự không phải chữ cái
        }
    }

    document.getElementById('text').value = plaintext; // Hiển thị kết quả giải mã trong ô nhập
    document.getElementById('output').innerText = "Kết quả giải mã: " + plaintext;
}

// Hàm sinh khóa ngẫu nhiên cho Caesar Cipher
function generateRandomKey(type) {
    if (type === 'caesar') {
        const randomKey = Math.floor(Math.random() * 25) + 1;
        document.getElementById('caesarKey').value = randomKey;
    } else if (type === 'affine') {
        const validA = [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25];
        const randomA = validA[Math.floor(Math.random() * validA.length)];
        const randomB = Math.floor(Math.random() * 26);
        document.getElementById('affineKeyA').value = randomA;
        document.getElementById('affineKeyB').value = randomB;
    } else if (type === 'substitution') {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let key = alphabet.split('').sort(() => Math.random() - 0.5).join('');
        document.getElementById('substitutionKey').value = key;
    } else if (type === 'vigenere') {
        const length = Math.floor(Math.random() * 10) + 5; // Random length between 5 and 14
        let key = '';
        for (let i = 0; i < length; i++) {
            key += String.fromCharCode(65 + Math.floor(Math.random() * 26));
        }
        document.getElementById('vigenereKey').value = key;
    }
}

// Hàm mã hóa Affine
function encryptAffine() {
    const a = parseInt(document.getElementById('affineKeyA').value);
    const b = parseInt(document.getElementById('affineKeyB').value);
    const text = document.getElementById('text').value.toUpperCase();
    let ciphertext = '';

    if (!isValidAffineKey(a, b)) {
        alert("Khóa Affine không hợp lệ. 'a' phải là số nguyên tố với 26.");
        return;
    }

    for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);
        if (charCode >= 65 && charCode <= 90) {
            ciphertext += String.fromCharCode(((a * (charCode - 65) + b) % 26) + 65);
        } else {
            ciphertext += text[i];
        }
    }

    document.getElementById('text').value = ciphertext;
    document.getElementById('output').innerText = "Kết quả mã hóa: " + ciphertext;
}

// Hàm giải mã Affine
function decryptAffine() {
    const a = parseInt(document.getElementById('affineKeyA').value);
    const b = parseInt(document.getElementById('affineKeyB').value);
    const ciphertext = document.getElementById('text').value.toUpperCase();
    let plaintext = '';

    if (!isValidAffineKey(a, b)) {
        alert("Khóa Affine không hợp lệ. 'a' phải là số nguyên tố với 26.");
        return;
    }

    const aInverse = modInverse(a, 26);

    for (let i = 0; i < ciphertext.length; i++) {
        const charCode = ciphertext.charCodeAt(i);
        if (charCode >= 65 && charCode <= 90) {
            plaintext += String.fromCharCode((aInverse * (charCode - 65 - b + 26) % 26) + 65);
        } else {
            plaintext += ciphertext[i];
        }
    }

    document.getElementById('text').value = plaintext;
    document.getElementById('output').innerText = "Kết quả giải mã: " + plaintext;
}

// Hàm kiểm tra tính hợp lệ của khóa Affine
function isValidAffineKey(a, b) {
    return gcd(a, 26) === 1;
}

// Hàm tính ước chung lớn nhất
function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

// Hàm tính nghịch đảo modulo
function modInverse(a, m) {
    for (let x = 1; x < m; x++) {
        if ((a * x) % m === 1) {
            return x;
        }
    }
    return 1;
}

// Hàm mã hóa Substitution Cipher
function encryptSubstitution() {
    const key = document.getElementById('substitutionKey').value.toUpperCase();
    const text = document.getElementById('text').value.toUpperCase();
    let ciphertext = '';

    if (key.length !== 26 || !/^[A-Z]+$/.test(key)) {
        alert("Khóa thay thế không hợp lệ. Vui lòng nhập 26 chữ cái.");
        return;
    }

    for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);
        if (charCode >= 65 && charCode <= 90) {
            ciphertext += key[charCode - 65];
        } else {
            ciphertext += text[i];
        }
    }

    document.getElementById('text').value = ciphertext;
    document.getElementById('output').innerText = "Kết quả mã hóa: " + ciphertext;
}

// Hàm giải mã Substitution Cipher
function decryptSubstitution() {
    const key = document.getElementById('substitutionKey').value.toUpperCase();
    const ciphertext = document.getElementById('text').value.toUpperCase();
    let plaintext = '';

    if (key.length !== 26 || !/^[A-Z]+$/.test(key)) {
        alert("Khóa thay thế không hợp lệ. Vui lòng nhập 26 chữ cái.");
        return;
    }

    for (let i = 0; i < ciphertext.length; i++) {
        const char = ciphertext[i];
        if (/[A-Z]/.test(char)) {
            const index = key.indexOf(char);
            plaintext += String.fromCharCode(65 + index);
        } else {
            plaintext += char;
        }
    }

    document.getElementById('text').value = plaintext;
    document.getElementById('output').innerText = "Kết quả giải mã: " + plaintext;
}

// Hàm mã hóa Vigenère Cipher
function encryptVigenere() {
    const key = document.getElementById('vigenereKey').value.toUpperCase().replace(/[^A-Z]/g, '');
    const text = document.getElementById('text').value.toUpperCase();
    let ciphertext = '';
    let keyIndex = '';

    if (key.length === 0) {
        alert("Vui lòng nhập khóa Vigenère hợp lệ (chỉ chữ cái).");
        return;
    }

    let k = 0;
    for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);
        if (charCode >= 65 && charCode <= 90) {
            const shift = key.charCodeAt(k % key.length) - 65;
            ciphertext += String.fromCharCode(((charCode - 65 + shift) % 26) + 65);
            keyIndex += shift + ' ';
            k++;
        } else {
            ciphertext += text[i];
            keyIndex += '  ';
        }
    }

    document.getElementById('text').value = ciphertext;
    document.getElementById('output').innerText = "Kết quả mã hóa: " + ciphertext;
    document.getElementById('vigenereKeyIndex').innerText = "Chỉ số khóa (k): " + keyIndex.trim();
}

// Hàm giải mã Vigenère Cipher
function decryptVigenere() {
    const key = document.getElementById('vigenereKey').value.toUpperCase().replace(/[^A-Z]/g, '');
    const ciphertext = document.getElementById('text').value.toUpperCase();
    let plaintext = '';
    let keyIndex = '';

    if (key.length === 0) {
        alert("Vui lòng nhập khóa Vigenère hợp lệ (chỉ chữ cái).");
        return;
    }

    let k = 0;
    for (let i = 0; i < ciphertext.length; i++) {
        const charCode = ciphertext.charCodeAt(i);
        if (charCode >= 65 && charCode <= 90) {
            const shift = key.charCodeAt(k % key.length) - 65;
            plaintext += String.fromCharCode(((charCode - 65 - shift + 26) % 26) + 65);
            keyIndex += shift + ' ';
            k++;
        } else {
            plaintext += ciphertext[i];
            keyIndex += '  ';
        }
    }

    document.getElementById('text').value = plaintext;
    document.getElementById('output').innerText = "Kết quả giải mã: " + plaintext;
    document.getElementById('vigenereKeyIndex').innerText = "Chỉ số khóa (k): " + keyIndex.trim();
}

// Hàm xử lý file và trích xuất nội dung văn bản
function handleFile() {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
        document.getElementById('text').value = event.target.result;
        document.getElementById('output').innerText = ''; // Xóa kết quả cũ
        closeHint(); // Đóng gợi ý nếu đang mở
    };

    if (file) {
        const fileType = file.type;
        if (/text\/|application\/pdf/.test(fileType)) {
            reader.readAsText(file);
        } else {
            alert('Vui lòng chọn file văn bản (.txt, .doc, .docx, .pdf).');
        }
    }
}

// Thêm hàm closeHint
function closeHint() {
    const floatingHint = document.getElementById('floatingHint');
    floatingHint.classList.add('hide');
    setTimeout(() => {
        floatingHint.style.display = 'none';
        floatingHint.classList.remove('hide');
    }, 500); // Đợi animation kết thúc
}

// Cập nhật hàm downloadEncryptedFile
function downloadEncryptedFile() {
    const outputContent = document.getElementById('output').innerText;
    
    // Tách lấy phần kết quả (bỏ qua phần "Kết quả mã hóa: " hoặc "Kết quả giải mã: ")
    const result = outputContent.split(': ')[1];
    
    // Tạo Blob từ nội dung kết quả
    const blob = new Blob([result], {type: 'text/plain'});
    
    // Tạo URL cho Blob
    const url = URL.createObjectURL(blob);
    
    // Tạo link tải xuống và kích hoạt nó
    const a = document.createElement('a');
    a.href = url;
    a.download = 'encrypted_text.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // Giải phóng URL object
    URL.revokeObjectURL(url);
    
    // Đóng gợi ý sau khi tải xuống
    closeHint();
}

// Xóa hàm overwriteOriginalFile vì không cần thiết cho nhập tay

// Cập nhật hàm checkAndShowHint
function checkAndShowHint(isManualInput = false) {
    const outputContent = document.getElementById('output').innerText;
    const floatingHint = document.getElementById('floatingHint');
    
    if (isManualInput && outputContent.trim() !== '') {
        floatingHint.classList.remove('hide');
        floatingHint.style.display = 'block';
    } else {
        floatingHint.style.display = 'none';
    }
}

// Thêm hàm này vào cuối file
// Đảm bảo hộp gợi ý được ẩn khi trang được tải
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('floatingHint').style.display = 'none';
    switchCipher('caesar');

    document.querySelector('.action-section button:nth-child(1)').addEventListener('click', encrypt);
    document.querySelector('.action-section button:nth-child(2)').addEventListener('click', decrypt);
});
