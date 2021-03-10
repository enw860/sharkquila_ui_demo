<style lang="less">
@import "../style/theme.less";

.Welcome {
	.Bullet-point:not(:last-child) {
		margin-bottom: 48px;
	}

	.BP-title {
		font-size: 32px;
		line-height: 32px;
		margin-bottom: 16px;
	}

	.BP-body p {
		max-width: 800px;
	}

	.Feature-row {
		display: flex;
		align-items: flex-start;

		strong {
			font-weight: 500;
			width: 90px;
			min-width: 90px;
			display: inline-block;
		}
	}
}
</style>

<template>
	<div class="Welcome VLayout">
		<section class="Bullet-point">
			<l-text class="BP-title" value="About" />
			<div class="BP-body">
				<p>
					This site is used for demostrating the usage of compositing
					a website by the Vue toolkit - 
					<l-link
						size="large"
						value="Sharkquila UI"
                        color="#0f62fe"
						href="https://github.com/enw860/sharkquila_ui_toolkit"
					/>.
				</p>

                <p>
					Sharkquila UI toolkits were designed for minimizing the amount of 
                    effot that spend on writting the basic UI components while building 
                    a website. Those toolkits will handle not only the visual effects of
                    the control but also provide a standardlize UX experience across 
                    all the pages. This webapp is used as an example of using Sharkquila 
                    UI toolkit for that purpose, you will see the power of the concept
                    while you exploring the site.
				</p>
			</div>
		</section>

		<section class="Bullet-point">
			<l-text class="BP-title" value="Features" />
			<div class="BP-body">
                <p>
					You could use this site as a playground for seeing how the toolkits
                    performed in run time environment, then you could copy and paste the 
                    code snippet in your app as a quick startup.
				</p>

                <p>
					All of the desiginated color style for controls are themeable, 
                    which means you can change the color of any pre-defined color
                    style as your wish.
				</p>

				<p>
					As per UI components listed in the navigation bar, it will
					describe the component in following dimentions:
                    <ul>
                        <li>
                            <div class="Feature-row">
                                <strong>Overview: </strong>
                                <span>The designiated use cases for the control.</span>
                            </div>
                        </li>
                        <li>
                            <div class="Feature-row">
                                <strong>Live demo: </strong>
                                <span>The demonstration of the control in run time environemnt.</span>
                            </div>
                        </li>
                        <li>
                            <div class="Feature-row">
                                <strong>Controls: </strong>
                                <span>Configeration options used for manipulate the control.</span>
                            </div>
                        </li>
                        <li>
                            <div class="Feature-row">
                                <strong>Code: </strong>
                                <span>Vue code for fast startup.</span>
                            </div>
                        </li>
                        <li>
                            <div class="Feature-row">
                                <strong>DOM: </strong>
                                <span>DOM structure of the current control.</span>
                            </div>
                        </li>
                        <li>
                            <div class="Feature-row">
                                <strong>Settings: </strong>
                                <span>All of the configurable fields with default values.</span>
                            </div>
                        </li>
                        <li>
                            <div class="Feature-row">
                                <strong>Slots: </strong>
                                <span>Available slots of the control. (if any)</span>
                            </div>
                        </li>
                        <li>
                            <div class="Feature-row">
                                <strong>Events: </strong>
                                <span>Desiginated events that could be bind to the control. (if any)</span>
                            </div>
                        </li>
                        <li>
                            <div class="Feature-row">
                                <strong>Methods: </strong>
                                <span>Buildin functions that could be called by referring the control. (if any)</span>
                            </div>
                        </li>
                    </ul>
				</p>
			</div>
		</section>
	</div>
</template>

<script>
export default {
	name: "Welcome",
	components: {},
	methods: {},
};
</script>