cur_dir=`pwd`

help() {
cat << EOT

Usage:
  clean   清理服务缓存
  install 依赖安装
  build   编译
  start   启动服务
  deploy  一键部署
EOT
exit
}

# 清理文件
clean() {
  rm -rf node_modules dist
}

# 初始化启动
install() {
  # 安装依赖
  yarn
}

build() {
  # 编译
  NODE_ENV=production npm run build
}

start() {
  pm2 startOrRestart process.json --only library
}

deploy() {
  clean
  install
  build
  start
}

# 解析调用参数
action=$1

case "$action" in
  clean|install|build|start|deploy)
    ${action}
    ;;
  *)
    help
    ;;
esac
