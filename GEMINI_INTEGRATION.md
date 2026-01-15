# Connecting Blendie to a Gemini Gem

You can create a custom **Gem** (in Google Gemini Advanced) or a **Custom GPT** (OpenAI) and link it to this repository so it stays updated with your latest instructions.

## Method 1: The "Live Link" (Best for Auto-Updates)

If your Gem supports **Actions** or **API calls**, you can point it to your live prompt API:

1.  **Create a new Gem**.
2.  **Instructions**: Paste the initial content of `GEMINI_PROMPT.md`.
3.  **Knowledge / Actions**: Add an action to fetch the latest system prompt from:
    `https://v2.blend.ie/api/agent/prompt`
4.  **System Instruction**: 
    > "Before every session, check the URL above for the latest 'Brain' updates and adjust your persona accordingly."

## Method 2: Manual "Feed" (Static)

1.  Go to `https://v2.blend.ie/api/agent/prompt`
2.  Copy the `prompt` text value.
3.  Paste it into the **System Instructions** box of your Gemini Gem.
4.  Upload any PDF/Docs (like your Green Coffee menu or Roast Log CSVs) to the Gem's "Knowledge" section.

## Why this is powerful
By keeping the prompt in your Codebase (`GEMINI_PROMPT.md`), you version control your Agent's personality just like your code.
