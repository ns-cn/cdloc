import {
	env,
	createExecutionContext,
	waitOnExecutionContext,
	SELF,
} from "cloudflare:test";
import { describe, it, expect } from "vitest";
import app from "../src";

const PROD_ENV = { IS_DEV: "0" };
const DEV_ENV = { IS_DEV: "1" };

describe("隆诚.work 首页", () => {
	it("www 子域（unit）返回 HTML + 业主视角内容", async () => {
		const request = new Request("http://www.cdloc.work/");
		const ctx = createExecutionContext();
		const response = await app.fetch(request, PROD_ENV, ctx);
		await waitOnExecutionContext(ctx);

		expect(response.status).toBe(200);
		const ct = (response.headers.get("content-type") || "").toLowerCase();
		expect(ct).toContain("text/html");
		const body = await response.text();
		expect(body.replace(/^\s+/, "")).toMatch(/^<!doctype html>/i);
		expect(body).toContain("隆诚");
		expect(body).toContain("我是");
		expect(body).toContain("业主");
		expect(body).toContain("合同与报价");
		expect(body).toContain("真实的团队");
		expect(body).toContain("施工全过程");
		expect(body).toContain("踩过的坑与风波");
		// 微信相关关键词
		expect(body).toContain("TANGYUJUN-CN");
		expect(body).toContain("加我微信");
		expect(body).toContain("联系业主");
	});

	it("www 子域（integration）返回 HTML", async () => {
		const response = await SELF.fetch("http://www.cdloc.work/");
		expect(response.status).toBe(200);
		const ct = (response.headers.get("content-type") || "").toLowerCase();
		expect(ct).toContain("text/html");
		const body = await response.text();
		expect(body).toContain("内容筹备中");
		expect(body).toContain("不写攻略");
		expect(body).toContain("TANGYUJUN-CN");
	});

	it("非根路径占位路由也返回首页", async () => {
		const response = await SELF.fetch("http://www.cdloc.work/about");
		expect(response.status).toBe(200);
		expect((response.headers.get("content-type") || "").toLowerCase()).toContain("text/html");
		expect(await response.text()).toContain("隆诚.work");
	});

	it("footer 只有一个联系业主按钮", async () => {
		const request = new Request("http://www.cdloc.work/");
		const ctx = createExecutionContext();
		const response = await app.fetch(request, PROD_ENV, ctx);
		await waitOnExecutionContext(ctx);
		const body = await response.text();
		// footer 中只有 1 个 contact-link，且文案是「联系业主」
		const matches = body.match(/class="link-btn contact-link"[^>]*>/g) || [];
		expect(matches.length).toBe(1);
		expect(body).toContain(">联系业主<");
		// 不再含邮箱链接
		expect(body).not.toContain("hi@cdloc.work");
		expect(body).not.toContain("mailto:");
		// 不再含「给我提建议」「推荐靠谱」
		expect(body).not.toContain("给我提建议");
	});

	it("页面包含微信二维码 modal", async () => {
		const request = new Request("http://www.cdloc.work/");
		const ctx = createExecutionContext();
		const response = await app.fetch(request, PROD_ENV, ctx);
		await waitOnExecutionContext(ctx);
		const body = await response.text();
		expect(body).toContain("qr-modal");
		expect(body).toContain("data-open-qr");
	});

	it("生产模式：裸域 cdloc.work（https）应 301 跳转到 www，保留 query", async () => {
		const request = new Request("https://cdloc.work/about?x=1");
		const ctx = createExecutionContext();
		const response = await app.fetch(request, PROD_ENV, ctx);
		await waitOnExecutionContext(ctx);
		expect(response.status).toBe(301);
		expect(response.headers.get("location")).toBe("https://www.cdloc.work/about?x=1");
	});

	it("生产模式：裸域根路径也跳，强制 https", async () => {
		const request = new Request("http://cdloc.work/");
		const ctx = createExecutionContext();
		const response = await app.fetch(request, PROD_ENV, ctx);
		await waitOnExecutionContext(ctx);
		expect(response.status).toBe(301);
		expect(response.headers.get("location")).toBe("https://www.cdloc.work/");
	});

	it("dev 模式：裸域不跳", async () => {
		const request = new Request("https://cdloc.work/about?x=1");
		const ctx = createExecutionContext();
		const response = await app.fetch(request, DEV_ENV, ctx);
		await waitOnExecutionContext(ctx);
		expect(response.status).toBe(200);
	});

	it("dev 模式：localhost 不跳", async () => {
		const request = new Request("http://localhost:8787/");
		const ctx = createExecutionContext();
		const response = await app.fetch(request, DEV_ENV, ctx);
		await waitOnExecutionContext(ctx);
		expect(response.status).toBe(200);
	});

	it("生产模式：localhost 不跳（host 不是 cdloc.work）", async () => {
		const request = new Request("http://localhost:8787/");
		const ctx = createExecutionContext();
		const response = await app.fetch(request, PROD_ENV, ctx);
		await waitOnExecutionContext(ctx);
		expect(response.status).toBe(200);
	});
});
