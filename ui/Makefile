# .env の内容を環境変数にエクスポートしつつコマンドを実行する
include .env
export $(shell sed 's/=.*//' .env)

run-app:
	pnpm run dev

local-liff:
	liff-cli serve \
   --liff-id $(VITE_LIFF_ID) \
   --url http://localhost:5173/dashboard  # Remix のURLを指定

cert:
	mkcert -install
	mkcert localhost
