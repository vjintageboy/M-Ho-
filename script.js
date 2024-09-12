let isCaesarCipher = true;

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
        isCaesarCipher = false;
        switchCipher();
    }
    
    // Ẩn hộp gợi ý khi trang được tải
    document.getElementById('floatingHint').style.display = 'none';
}

function switchCipher() {
    isCaesarCipher = !isCaesarCipher;
    const title = document.getElementById('title');
    const keyInput = document.getElementById('key');
    const generateKeyButton = document.querySelector('.key-section button');

    if (isCaesarCipher) {
        title.innerText = "Mô Phỏng Mã Hóa Caesar Cipher";
        keyInput.type = "number";
        keyInput.placeholder = "Nhập khóa (số từ 1 đến 25)";
        keyInput.min = "1";
        keyInput.max = "25";
        generateKeyButton.onclick = generateRandomKey;
    } else {
        title.innerText = "Mô Phỏng Mã Hóa Thay Thế";
        keyInput.type = "text";
        keyInput.placeholder = "Nhập khóa (chỉ chứa chữ cái)";
        keyInput.removeAttribute("min");
        keyInput.removeAttribute("max");
        generateKeyButton.onclick = generateKey;
    }
}

// Cập nhật hàm encrypt và decrypt
function encrypt() {
    if (isCaesarCipher) {
        encryptCaesar();
    } else {
        encryptSubstitution();
    }
    checkAndShowHint(true);
}

function decrypt() {
    if (isCaesarCipher) {
        decryptCaesar();
    } else {
        decryptSubstitution();
    }
    checkAndShowHint(true);
}

// Hàm mã hóa Caesar Cipher
function encryptCaesar() {
    const key = parseInt(document.getElementById('key').value);
    const text = document.getElementById('text').value.toUpperCase();
    let ciphertext = '';

    // Kiểm tra khóa hợp lệ
    if (isNaN(key) || key < 1 || key > 25) {
        alert("Vui lòng nhập khóa hợp lệ (số từ 1 đến 25)!");
        return;
    }

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
    const key = parseInt(document.getElementById('key').value);
    const ciphertext = document.getElementById('text').value.toUpperCase();
    let plaintext = '';

    // Kiểm tra khóa hợp lệ
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
    document.getElementById('output').innerText = "Kt quả giải mã: " + plaintext;
}

// Hàm sinh khóa ngẫu nhiên cho Caesar Cipher
function generateRandomKey() {
    const randomKey = Math.floor(Math.random() * 25) + 1;
    document.getElementById('key').value = randomKey;
}

// Hàm mã hóa Substitution Cipher
function encryptSubstitution() {
    const key = document.getElementById('key').value.toUpperCase();
    const text = document.getElementById('text').value.toUpperCase();
    let ciphertext = '';

    // Kiểm tra xem khóa có hợp lệ không
    if (key.length === 0) {
        alert("Vui lòng nhập khóa!");
        return;
    }

    // Mã hóa
    for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);
        if (charCode >= 65 && charCode <= 90) { // Chỉ mã hóa chữ cái
            ciphertext += key[(charCode - 65) % key.length];
        } else {
            ciphertext += text[i]; // Giữ nguyên ký tự không phải chữ cái
        }
    }

    document.getElementById('text').value = ciphertext; // Hiển thị kết quả mã hóa trong ô nhập
    document.getElementById('output').innerText = "Kết quả mã hóa: " + ciphertext;
}

// Hàm giải mã Substitution Cipher
function decryptSubstitution() {
    const key = document.getElementById('key').value.toUpperCase();
    const ciphertext = document.getElementById('text').value.toUpperCase();
    let plaintext = '';

    // Kiểm tra xem khóa có hợp lệ không
    if (!key) {
        alert("Vui lòng nhập khóa!");
        return;
    }

    // Giải mã
    for (const char of ciphertext) {
        if (/[A-Z]/.test(char)) { // Chỉ giải mã chữ cái A-Z
            const index = key.indexOf(char);
            plaintext += index !== -1 ? String.fromCharCode(65 + index) : char;
        } else {
            plaintext += char; // Giữ nguyên ký tự không phải chữ cái
        }
    }

    // Hiển thị kết quả giải mã
    document.getElementById('text').value = plaintext;
    document.getElementById('output').innerText = `Kết quả giải mã: ${plaintext}`;
}

// Hàm sinh khóa ngẫu nhiên cho Substitution Cipher
function generateKey() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let key = alphabet.split('').sort(() => Math.random() - 0.5).join(''); // Xáo trộn ngẫu nhiên
    document.getElementById('key').value = key;
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
});
