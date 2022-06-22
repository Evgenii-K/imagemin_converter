#!/usr/bin/env node
import imagemin from "imagemin";
import webp from "imagemin-webp";
import fs from 'fs';
const executorDir = process.cwd();
// // const inquirer = require('inquirer');
import path from 'path';
// const readline = require('readline');
inputDirectory = '/assets';

const fullPath = path.join(executorDir, inputDirectory)

const isDirectory = (fileName) => {
  return fs.lstatSync(fileName).isDirectory();
};

const list = (directory) => {
  return fs.readdirSync(directory);
};

const convert = async (directory) => {
	const reg = /\\/g
	const relativePath = directory.replace(reg, '\/').slice(1)

	const files = await imagemin([`${relativePath}/*.png`], {
		destination: relativePath,
		plugins: [webp({
				lossless: true // Losslessly encode images
		})]
	});

	console.log(files);
}

const showList = async (directory) => {
	const absolutePath = directory.replace(executorDir, '')
	
	await convert(absolutePath)
	
	if(isDirectory(directory)) {
		
		list(directory).forEach(item => {
			const currentFolder = path.join(directory, item)
			
			if(isDirectory(currentFolder)) {
				showList(currentFolder)
			}
		})
		
	}
}

showList(fullPath)