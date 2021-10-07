<template>
	<div class="app">
		<div class="app-title">
			爱是我们最高的欢乐和最深的悲愁。<br />
			<div>————德里克-沃尔科特</div>
		</div>

		<CountDown :second="second" class="app-countdown" />

		<div class="app-action">
			<div @click="handleDelay" class="app-action-btn1">延长20s</div>
			<div class="app-action-btn2">跳过休息</div>
		</div>

	</div>
</template>

<script>
import CountDown from "./components/count-down.vue";
export default {
	data () {
		return {
			second: 30
		}
	},
	components: {
		CountDown
	},
	methods: {
		handleDelay () {
			this.second += 20
		}
	}
}
</script>

<style lang="scss">
* {
	margin: 0;
	padding: 0;
}

.center {
	display: flex;
	align-items: center;
	justify-content: center;
}
.app {
	&-title {
		font-size: 20px;
		color: #333;
		text-align: left;
		font-weight: bold;
		margin-top: 50px;
		width: 320px;
		word-break: break-all;
		margin: 0 auto;
		margin-top: 50px;
		line-height: 1;
		div {
			font-size: 14px;
			color: #999;
			font-weight: 400;
			margin-top: 16px;
		}
	}

	&-countdown {
		margin-top: 70px;
	}

	&-action {
		@extend .center;
		margin-top: 40px;
		&-btn1,
		&-btn2 {
			width: 100px;
			height: 40px;
			background: #fff;
			color: #26c68a;
			border-radius: 20px;
			border: 1px solid #26c68a;
			box-sizing: border-box;
			@extend .center;
			line-height: 1;
			font-size: 14px;
		}
		&-btn2 {
			background: #26c68a;
			color: #fff;
			margin-left: 30px;
		}
	}
}
</style>