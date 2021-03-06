import {Directive, Component, View, CORE_DIRECTIVES, ViewEncapsulation} from 'angular2/angular2';
import {QueryList, ContentChildren, ElementRef} from 'angular2/angular2';
import {Input, Output, EventEmitter, OnInit} from 'angular2/angular2';

@Directive({
	selector: '.carousel-item',
	host: {
		'[class.active]': 'isActive',
		'[class.slide-out-left]': 'left',
		'[class.slide-out-right]': 'right',
		'[class.slide-in-right]': 'next',
		'[class.slide-in-left]': 'prev',
		'(animationstart)': 'animationStart()',
		'(webkitAnimationStart)': 'animationStart()',
		'(oanimationstart)': 'animationStart()',
		'(MSAnimationStart)': 'animationStart()',
		'(animationend)': 'animationEnd()',
		'(webkitAnimationEnd)': 'animationEnd()',
		'(oanimationend)': 'animationEnd()',
		'(MSAnimationEnd)': 'animationEnd()',
	},
})
export class CarouselItem {
	isActive: boolean;
	left: boolean;
	right: boolean;
	next: boolean;
	prev: boolean;
	exiting: boolean;

	constructor() {
		this.resetStatus();
	}

	resetStatus(): void {
		this.isActive = false;
		this.exiting = false;
		this.resetAnimation();
	}

	resetAnimation(): void {
		//this.outLeft = this.inLeft = this.outRight = this.inRight = false;
		this.left = this.right = this.next = this.prev = false;
	}

	animationStart(): void {

	}

	animationEnd(): void {
		if(this.exiting)
			this.resetStatus();
		else
			this.resetAnimation();
	}

	moveLeft(): void {
		if(this.isActive) {
			this.exiting = true;
			this.left = true;
		} else {
			this.isActive = true;
			this.prev = true
		}
	}

	moveRight(): void {
		if(this.isActive) {
			this.exiting = true;
			this.right = true;
		} else {
			this.isActive = true;
			this.next = true
		}
	}

	checkIfAnimating(): boolean {
		return this.left || this.right || this.next || this.prev;
	}
}

@Component({
	selector: 'carousel'
})
@View({
	styleUrls: ['dist/components/carousel/carousel.css'],
	templateUrl: 'dist/components/carousel/carousel.html',
	directives: [CORE_DIRECTIVES, CarouselItem],
	encapsulation: ViewEncapsulation.None
})
export class Carousel {
	images: CarouselItem[] = [];
	@ContentChildren(CarouselItem) imageQuery: QueryList<CarouselItem>;

	constructor() {

	}

	afterContentInit(): void {
		(<any>this.imageQuery.changes).toRx()
				.subscribe(() => this.registerImages());
		this.registerImages();
	}

	registerImages(): void {
		this.images = [];
		this.imageQuery.map((i) => this.images.push(i));
		var activeImage = this.getActiveImage();
		if(this.images.length > 0 && activeImage == null)
			this.images[0].isActive = true;
	}

	setAllInactive(): void {
		this.images.map((i) => i.resetStatus());
	}

	switchTo(image: CarouselItem): void {
		var activeImage = this.getActiveImage();

		if(this.images.indexOf(image) < this.images.indexOf(activeImage)) {
			image.moveLeft();
			activeImage.moveLeft();
		}
		else {
			image.moveRight();
			activeImage.moveRight();
		}
	}

	nextImage(): void {
		if(this.checkIfAnimating())
			return;
		var activeImage = this.getActiveImage();
		var index = this.getActiveIndex() + 1;
		index = index >= this.images.length ? 0 : index;
		activeImage.moveLeft();
		this.images[index].moveLeft();
	}

	prevImage(): void {
		if(this.checkIfAnimating())
			return;

		var activeImage = this.getActiveImage();
		var index = this.getActiveIndex() - 1;
		index = index < 0 ? this.images.length-1 : index;
		activeImage.moveRight()
		this.images[index].moveRight();
	}

	checkIfAnimating(): boolean {
		return this.images.reduce((prev, curr) => curr.checkIfAnimating() || prev ,false);
	}

	getActiveIndex(): number {
		var activeImage = this.getActiveImage();
		if(activeImage == null)
			return -1;

		return this.images.indexOf(activeImage);
	}

	getActiveImage(): CarouselItem {
		return this.images.reduce((prev, curr) => curr.isActive ? curr : prev, null);
	}
}

export var CAROUSEL_PROVIDERS = [
	Carousel, CarouselItem
];