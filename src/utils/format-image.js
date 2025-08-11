export function convertFileToBase64(fileOrUrl) {
  if (!fileOrUrl) return;
  return new Promise((resolve, reject) => {
    // Check if the input is a base64 string
    const isBase64 = typeof fileOrUrl === 'string' && /^data:/.test(fileOrUrl);

    if (isBase64) {
      // If it's a base64 string, return it directly
      resolve(fileOrUrl);
    } else if (/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(fileOrUrl)) {
      // If it's a URL, return it directly
      resolve(fileOrUrl);
    } else {
      // If it's a file, convert it to base64
      const reader = new FileReader();

      reader.onload = () => {
        const base64String = reader.result.split(',')[1];
        resolve(base64String);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(fileOrUrl);
    }
  });
}
