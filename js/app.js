'use strict';

$(document).ready(
	$.ajax('./../data/page-1.json').then((data) => {
		let keywords = [];

		data.sort(function (a, b) {
			return a.horns - b.horns;
		});

		data.forEach((img) => {
			let newImage = new Image(img);
			if (!keywords.includes(newImage.keyword)) {
				keywords.push(newImage.keyword);
			}
			newImage.render();
		});

		keywords.forEach((keyword) => {
			let category = $('option').first().clone();
			category.attr('value', keyword);
			category.text(keyword);
			$('select').append(category);
		});

		$('select').on('change', function () {
			if ($(this).val() === 'default') {
				$('.content').html('');
				data.forEach((img) => {
					let newImage = new Image(img);
					if (!keywords.includes(newImage.keyword)) {
						keywords.push(newImage.keyword);
					}
					newImage.render();
				});
			} else {
				$('.content').html('');
			}
			let search = data.filter((item) => item.keyword === $(this).val());
			search.forEach((item) => {
				let searchImage = new Image(item);
				searchImage.render();
			});
		});
	}),
);

function Image(img) {
	this.image_url = img.image_url;
	this.title = img.title;
	this.description = img.description;
	this.keyword = img.keyword;
	this.horns = img.horns;
}

Image.prototype.render = function () {
	$('.content').append(`<div id="photo-template">
                <h2 class="title">${this.title}</h2>
                <img src=${this.image_url} alt=${this.title} class="img">
                <p class='desc'>${this.description}</p>
            </div>`);
};
