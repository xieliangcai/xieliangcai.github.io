---
title: Grom知识
subtitle:
date: 2023-03-01T16:18:07+08:00
draft: true
author:
  name:
  link:
  email:
  avatar:
description:
keywords:
license:
comment: false
weight: 0
tags:
  - gorm
categories:
  - go知识
hiddenFromHomePage: false
hiddenFromSearch: false
summary:
resources:
  - name: featured-image
    src: featured-image.jpg
  - name: featured-image-preview
    src: featured-image-preview.jpg
toc: true
math: false
lightgallery: false
password:
message:
repost:
  enable: true
  url:

# See details front matter: https://fixit.lruihao.cn/documentation/content/#front-matter
---

<!--more-->

###  grom find时必需时指针引用，不然直接会没有返回，此问题可能是bug
> 错误案例
```azure
	var relation []models.CloudRegionTempRelation
	err := m.Orm.Debug().Model(&models.CloudRegionTempRelation{}).Where("set_id=? AND set_version=? ", req.SetId, req.SetVersion).Find(relation).Error
	if err != nil {
		log.Errorf("查询云区域与模板集关系失败%v\n", err.Error())
		return err
	}
```
> 正确案例

```azure
	var relation []models.CloudRegionTempRelation
	err := m.Orm.Debug().Model(&models.CloudRegionTempRelation{}).Where("set_id=? AND set_version=? ", req.SetId, req.SetVersion).Find(&relation).Error
	if err != nil {
		log.Errorf("查询云区域与模板集关系失败%v\n", err.Error())
		return err
	}
```
