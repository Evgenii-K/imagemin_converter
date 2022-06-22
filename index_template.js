import imagemin from "imagemin";
import webp from "imagemin-webp";

const files = await imagemin(['assetes/*.png'], {
	destination: 'build',
  plugins: [webp({
      lossless: true // Losslessly encode images
  })]
	// plugins: [
	// 	imageminJpegtran(),
	// 	imageminPngquant({
	// 		quality: [0.6, 0.8]
	// 	})
	// ]
});

console.log(files);