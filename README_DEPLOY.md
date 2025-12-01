# 项目部署指南

本项目支持使用 Docker 和 Docker Compose 进行一键部署。

## 前置要求

- 服务器需安装 Docker 和 Docker Compose。

## 部署步骤

1.  将项目代码上传到服务器。
2.  在项目根目录下运行以下命令：

```bash
docker-compose up -d --build
```

该命令会自动：
- 构建 NestJS 应用镜像。
- 启动 MySQL 数据库和 Redis 缓存服务。
- 等待数据库启动完成后，自动初始化系统配置和管理员账号（如果不存在）。
- 启动应用服务。

## 默认配置

- **应用端口**: 3000
- **数据库**: MySQL 8.0 (端口 3306)
  - 用户名: root
  - 密码: root
  - 数据库名: nest_db
- **Redis**: 端口 6379
- **管理员账号**:
  - 用户名: `admin`
  - 密码: `000000`

## 数据持久化

- 数据库数据存储在 Docker 卷 `mysql_data` 中。
- Redis 数据存储在 Docker 卷 `redis_data` 中。
- 上传的文件存储在项目目录下的 `uploads` 文件夹中。
- 日志文件存储在项目目录下的 `logs` 文件夹中。

## 常用命令

- 查看日志: `docker-compose logs -f`
- 停止服务: `docker-compose down`
- 重启服务: `docker-compose restart`

