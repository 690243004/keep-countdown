<template>
	<div class="count-down">
		<div class="container">
			<div class="card">
				<div class="box">
					<div class="percent">
						<svg :style="svgStyle">
							<!-- 外接圆  -->
							<circle v-bind="outerAttrs"></circle>
							<!-- 内接圆  -->
							<circle v-bind="innerAttrs"></circle>
						</svg>
						<div v-if="theSchond > 0" class="percent-text">{{theSchond}}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
/**
 * svg 属性
 * stroke-dasharray :
 *  用于创建虚线 后面其实是跟一个数组，参数为长度、间距，然后重复
 *  那么对于一个圆来讲，需要设置 多少的 stroke-dasharray 才能完全填充吗
 *  理论上应该是周长的两倍
 *  周长公式 : 2 * pi r
 *  例如 : 70 的半径，周长为 439，当设置 stroke-dasharray 为 440 时，是完全覆盖的
 *
 *
 * stroke-dashoffset :
 *  这个属性是相对于起始点的偏移，正数偏移x值的时候，相当于往左移动了x个长度单位，负数偏移x的时候，相当于往右移动了x个长度单位
 *
 * 原理 :
 * - 当 stroke-dasharray 设置为周长两倍时，可看做一根线填充了圆形
 * - 而这根线超出过了周长，只有两段，一根为实线、一根为虚线
 * - 当 stroke-dashoffset 设置为 0 时，刚好为实线覆盖圆
 * - 而当 stroke-dashoffset 为 stroke-dasharray ,则刚好是虚线覆盖圆
 * - 通过 设置 stroke-dashoffset 可以达到百分比的效果，公式为 calc(2倍周长 - (2倍周长 * 占比) / 100)
 */
import animationMixin from './animation-mixin'
export default {
	mixins: [animationMixin],
	props: {
		second: {
			type: Number,
			default: 30
		},
		radius: {
			type: Number,
			default: 70
		}
	},
	data () {
		return {
			theSchond: 0,
			firstRun: true,
			timer: null
		};
	},
	computed: {
		// 周长 
		perimeter () {
			return Math.PI * 2 * this.radius
		},
		// 内接圆属性
		innerAttrs () {
			return {
				cx: this.radius,
				cy: this.radius,
				r: this.radius,
				style: {
					"stroke-dasharray": this.perimeter,
					"stroke-dashoffset": this.perimeter - (this.perimeter * this.theSchond) / this.second
				}
			}
		},
		// 外接圆属性
		outerAttrs () {
			return {
				cx: this.radius,
				cy: this.radius,
				r: this.radius,
			}
		},
		svgStyle () {
			return {
				width: this.radius * 2 + 10,
				height: this.radius * 2 + 10,
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.count-down {
	.percent {
		position: relative;
		&-text {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			color: #26c68a;
			font-size: 50px;
			line-height: 1;
			font-weight: bold;
			transition: all 0.5s linear;
		}
		svg {
			margin: 0 auto;
			position: relative;
			display: flex;

			circle {
				width: 100%;
				height: 100%;
				fill: none;
				stroke: #fff;
				stroke-width: 10;
				stroke-linecap: round;
				transform: translate(5px, 5px);
				&:last-child {
					stroke: #21cf90;
					transition: all 0.5s linear;
					position: absolute;
					transform: translate(5px, -5px) rotate(-90deg);
					transform-origin: center center;
				}
			}
		}
	}
}
</style>
