'use strict';

let keywords = [];

let gallary = [];

$(document).ready(
	$.ajax('./../data/page-2.json').then((data2) => {
		data2.forEach((img) => {
			let newImage = new Image(img);
			if (!keywords.includes(newImage.keyword)) {
				keywords.push(newImage.keyword);
			}
			if (!gallary.includes(newImage)) {
				gallary.push(newImage);
			}
		});
	}),

	$.ajax('./../data/page-1.json').then((data) => {
		data.forEach((img) => {
			let newImage = new Image(img);
			if (!keywords.includes(newImage.keyword)) {
				keywords.push(newImage.keyword);
			}

			if (!gallary.includes(newImage)) {
				gallary.push(newImage);
			}
			newImage.toHtml();
		});

		keywords.forEach((keyword) => {
			let category = $('option').first().clone();
			category.attr('value', keyword);
			category.text(keyword);
			$('.filter').append(category);
		});

		imageFilter(data);
		imageSort(data);
		pagination();
		search(data);
	}),
);

function getData(page) {
	$('.content').html('');
	$.ajax(`./../data/page-${page}.json`).then((data) => {
		data.forEach((img) => {
			let newImage = new Image(img);
			if (!keywords.includes(newImage.keyword)) {
				keywords.push(newImage.keyword);
				gallary.push(newImage);
			}
			newImage.toHtml();
		});

		$('.filter').html(`<option value="default">Filter by Keyword</option>`);
		keywords.forEach((keyword) => {
			let category = $('option').first().clone();
			category.attr('value', keyword);
			category.text(keyword);
			$('.filter').append(category);
		});

		$('.sort').val('default');

		imageFilter(data);
		imageSort(data);
	});
}

function imageFilter(data) {
	$('.filter').on('change', function () {
		if ($(this).val() === 'default') {
			$('.content').html('');
			data.forEach((img) => {
				let newImage = new Image(img);
				newImage.toHtml();
			});
		} else {
			$('.content').html('');
		}

		let search = gallary.filter((item) => item.keyword === $(this).val());

		search.forEach((item) => {
			let searchImage = new Image(item);
			searchImage.toHtml();
		});
	});
}

function imageSort(data) {
	let defaultData = [...data];
	$('.sort').on('change', function () {
		if ($(this).val() === 'name') {
			$('.content').html('');
			data.sort((a, b) => {
				return a.title.localeCompare(b.title);
			});

			data.forEach((img) => {
				let newImage = new Image(img);
				newImage.toHtml();
			});
		} else if ($(this).val() === 'horns') {
			$('.content').html('');
			data.sort((a, b) => {
				return a.horns - b.horns;
			});

			data.forEach((img) => {
				let newImage = new Image(img);
				newImage.toHtml();
			});
		} else {
			$('.content').html('');
			defaultData.forEach((img) => {
				let newImage = new Image(img);
				newImage.toHtml();
			});
		}
	});
}

function pagination() {
	$('.btn1').on('click', function () {
		getData(1);
	});
	$('.btn2').on('click', function () {
		getData(2);
	});
}

function search(data) {
	$('.search').on('keyup', function () {
		let photos = gallary.filter((item) =>
			item.title.toLowerCase().includes($(this).val().toLowerCase()),
		);

		$('.content').html('');

		photos.forEach((item) => {
			let searchImage = new Image(item);
			searchImage.toHtml();
		});
	});
}

function Image(img) {
	this.image_url = img.image_url;
	this.title = img.title;
	this.description = img.description;
	this.keyword = img.keyword;
	this.horns = img.horns;
}

Image.prototype.toHtml = function () {
	let template = $('#template-photo').html();
	let image = Mustache.render(template, this);
	$('.content').append(image);
};
