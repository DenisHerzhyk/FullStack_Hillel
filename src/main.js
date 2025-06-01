console.log('#58. JavaScript homework example file')

/*
 *
 * #1
 *
 * Технічне завдання для розробки функції "compressFile"
 *
 * Задача:
 * Розробити асинхронну функцію, що використовує алгоритм Gzip для компресії заданого файлу.
 * Функція має генерувати унікальне ім'я для компресованого файлу, якщо файл з таким іменем вже існує,
 * та забезпечувати високий рівень надійності та безпеки процесу компресії.
 *
 * Функціональні вимоги:
 * 1. Вхідні параметри:
 *    - `filePath`: Шлях до файлу, який потрібно компресувати.
 *
 * 2. Вихідні дані:
 *    - Функція повертає шлях до компресованого файлу як рядок.
 *
 * 3. Унікальність:
 *    - Перевірка наявності існуючих файлів з таким самим іменем і створення унікального імені файлу
 *      шляхом додавання номера до існуючого імені, якщо необхідно.
 *
 * 4. Обробка помилок:
 *    - Функція має ідентифікувати та коректно обробляти помилки читання, запису та доступу до файлів.
 *    - В разі помилок, функція має повертати відповідні повідомлення про помилку або коди помилок,
 *      що дозволяють користувачеві або іншим частинам програми адекватно реагувати на такі ситуації.
 *
 * Технічні вимоги:
 * - Використання сучасних можливостей JavaScript (ES6+), включаючи асинхронні функції, стрімове API Node.js, та ESM
 *   для легкої інтеграції та тестування.
 * - Функція має бути написана таким чином, щоб її можна було експортувати та використовувати в інших частинах програми
 *   або тестових сценаріях.
 * - Забезпечення документації коду з описом параметрів, процесу роботи, виключень, які можуть бути сгенеровані,
 *   та прикладами використання.
 * - Підготовка функції для можливості легкого мокування та тестування за допомогою JEST.
 *
 */
import * as path from 'path'
import { createGzip, createGunzip } from 'zlib'
import {createReadStream, createWriteStream, promises} from 'fs'
import {parse, join} from 'path'
import { pipeline } from 'stream'
import fs from 'fs';
import { promisify } from 'util'

const pipe = promisify(pipeline)

async function generateUniqueName(dir, name, ext) {
  let count = 0;
  let uniqueName;
  do {
    uniqueName = join(dir, `${name}${count ? `_${count}` : ''}${ext}`);
    count++;
    try {
      await promises.access(uniqueName);
    }
    catch (error) {
      if (error.code == "ENOENT") {
        return uniqueName;
      }
      throw error;
    }
  } while (true);
}

async function compressFile(filePath) {
  const { dir, name, ext } = parse(filePath);
  const finalPath = await generateUniqueName(dir, name, ext + '.gz');

  let resourse = createReadStream(filePath);
  let destication = createWriteStream(finalPath);
  let compress = createGzip();

  try {
    await pipe(resourse, compress, destication);
    console.log('File compressed:', finalPath);
    return finalPath;
  } 
  catch (err) {
    console.error('An error occurred during compression:', err);
    throw err;
  }
}

/*
 *
 * #2
 *
 * Технічне завдання для розробки функції "decompressFile"
 *
 * Задача:
 * Розробити асинхронну функцію, яка використовує алгоритм Gzip для розпакування заданого компресованого файлу у вказане місце збереження. Функція має генерувати унікальне ім'я для розпакованого файлу, якщо файл з таким іменем вже існує, та забезпечувати високий рівень надійності та безпеки процесу розпакування.
 *
 * Функціональні вимоги:
 * 1. Вхідні параметри:
 *  - `compressedFilePath`: Шлях до компресованого файлу, який потрібно розпакувати.
 *  - `destinationFilePath`: Шлях, де буде збережено розпакований файл.
 *
 * 2. Вихідні дані:
 *  - Функція повертає шлях до розпакованого файлу як рядок.
 *
 * 3. Унікальність:
 *  - Перевірка наявності існуючих файлів з таким самим іменем і створення унікального імені файлу шляхом додавання номера до існуючого імені, якщо необхідно.
 *
 * 4. Обробка помилок:
 *  - Функція має ідентифікувати та коректно обробляти помилки читання, запису та доступу до файлів.
 *  - В разі помилок, функція має повертати відповідні повідомлення про помилку або коди помилок,
 *    що дозволяють користувачеві або іншим частинам програми адекватно реагувати на такі ситуації.
 *
 * Технічні вимоги:
 * - Використання сучасних можливостей JavaScript (ES6+), включаючи асинхронні функції, стрімове API Node.js, та ESM для легкої інтеграції та тестування.
 * - Функція має бути написана таким чином, щоб її можна було експортувати та використовувати в інших частинах програми або тестових сценаріях.
 * - Забезпечення документації коду з описом параметрів, процесу роботи, виключень, які можуть бути сгенеровані, та прикладами використання.
 * - Підготовка функції для можливості легкого мокування та тестування за допомогою JEST.
 *
 */

async function decompressFile(compressedFilePath, destinationFilePath) {

  await promises.access(compressedFilePath, fs.constants.F_OK).catch((err) => {
    console.error('Error accessing the compressed file:', err.message)
    throw err
  })

  const parsedPath = path.parse(destinationFilePath);
  let finalPath = await generateUniqueName(parsedPath.dir, parsedPath.name, parsedPath.ext);
  let resourse = createReadStream(compressedFilePath);
  let destication = createWriteStream(finalPath);
  let decompress = createGunzip();

  try {
    await pipe(resourse, decompress, destication);
    console.log('File decompressed:', finalPath);
    return finalPath;
  }
  catch (err) {
    console.error('An error occurred during decompression:', err);
    throw err;
  }
}

// ! Перевірка роботи функцій стиснення та розпакування файлів
async function performCompressionAndDecompression() {
  try {
    const compressedResult = await compressFile('./files/source.txt')
    console.log(compressedResult)
    const decompressedResult = await decompressFile(compressedResult, './files/source_decompressed.txt')
    console.log(decompressedResult)
  } catch (error) {
    console.error('Error during compression or decompression:', error)
  }
}

export { compressFile, decompressFile, performCompressionAndDecompression }
