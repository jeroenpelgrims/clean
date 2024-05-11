import type { ComponentType } from "svelte";
import mjml2html from 'mjml';

type RenderResult = {
  head: string;
  html: string;
  css: {
    code: string;
    map: string | null;
  }
}

type ComponentProps<TComponent extends ComponentType> =
  ConstructorParameters<TComponent>[0]["props"];

type RenderFunction<
  TComponent extends ComponentType,
  TProps = ComponentProps<TComponent>
> = (props: TProps) => RenderResult;

type ComponentWithRender<TComponent extends ComponentType> = TComponent & {
  render: RenderFunction<TComponent>
};

export function renderComponent<TComponent extends ComponentType>(
	Component: TComponent,
	props: ComponentProps<TComponent>
): RenderResult | undefined {
	const { render } = Component as ComponentWithRender<TComponent>;
	return render ? render(props) : undefined;
}

export function renderComponentToString<TComponent extends ComponentType>(
	Component: TComponent,
	props: ComponentProps<TComponent>
): string | undefined {
	const result = renderComponent(Component, props);
	return result?.html;
}

export function renderMailTemplate<TComponent extends ComponentType>(
	Component: TComponent,
	props: ComponentProps<TComponent>
): string | undefined {
	const mjml = renderComponentToString(Component, props);
	const result = mjml ? mjml2html(mjml) : undefined;
	return result?.html;
}

