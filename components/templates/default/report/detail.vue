
<template>
  <div>
    <div v-show="activeTab == 'home'" class="subbox-show">
      <header class="mui-bar mui-bar-nav">
        <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left sub-go-back">返回</a>
        <span class="fa close-icon" @click="goHome()">×</span>
        <h1 class="mui-title">项目详情</h1>
        <a href="javascript:;" class="mui-pull-right more-opt" v-show="basicinfo.state == 'wait' || basicinfo.state == 'wait_handle' || basicinfo.state == 'rescinded'">
          <span class="point" @click="preMoreOpt()">
            <svg class="svg-style">
              <use xlink:href="/svg/icon.svg#more"></use>
            </svg>
          </span>
          <span class="sub-opt-box" v-show="getmoreopt" @click="optFunc(basicinfo.state)">
            <span class="triangle"></span>
            <span>{{(basicinfo.state == 'wait' || basicinfo.state == 'rescinded') ? '删除报备' : '撤回报备'}}</span>
          </span>
        </a>
      </header>
      <div class="detail-box">
        <div class="basic-info">
          <label>
            <span class="money">{{basicinfo.amount}}元</span>·<span>{{basicinfo.name}}</span>
          </label>
          <div class="stars-style">
            <span class="star-box">
              <i class="fa mui-action-back mui-icon mui-icon-left-nav mui-pull-right" v-for="sub in stars" aria-hidden="true" v-bind:class="sub <= basicinfo.feasibility ? 'fa-star' : 'fa-star-o'"></i>
            </span>
          </div>
          <div class="fz14">{{basicinfo.first_party_name}}</div>
          <div class="fz14 intro-style">{{basicinfo.sketch}}</div>
          <span class="fa fa-angle-right edit-basic" @click="editBasic(basicinfo.id)" v-show="basicinfo.state == 'wait' || basicinfo.state == 'rescinded' || basicinfo.state == 'had_reset'"></span>
          <div class="fz12" style="height: 24px;">
            <span style="display: inline-block;float: left;margin-left: 15px;">有效期{{valtimeFilter(basicinfo.validity)}}</span>
            <span style="display: inline-block;margin-left: 10px;float: right;margin-right: 15px;">创建时间:{{forMatTime(basicinfo.create_time)}}</span>
          </div>
          <div class="go-report" v-if="basicinfo.state == 'wait' || basicinfo.state == 'had_reset' || basicinfo.state == 'rescinded'">
            <span class="left-circle icon-circle"></span>
            <span class="right-circle icon-circle"></span>
            <a href="javascript:;" @click="gotoReport()">去报备</a>
          </div>
        </div>
        <div class="sub-detail">
          <div class="mui-segmented-control detail-tab">
            <a class="mui-control-item mui-active" href="#projectdetail">
              <span>项目介绍</span>
              <span class="active-icon"></span>
            </a>
            <a class="mui-control-item" href="#reportrecord">
              <span>报备记录</span>
              <span class="active-icon"></span>
            </a>
            <a class="mui-control-item" href="#reportlog">
              <span>进度跟踪</span>
              <span class="active-icon"></span>
            </a>
          </div>
          <div class="mui-content">
            <div class="detail-body">
              <div id="projectdetail" class="mui-control-content mui-active">
                <div class="basic-box">
                  <div class="sub-detail-box">
                    <label>项目信息</label>
                    <span class="edit-icon" @click="editProject(basicinfo.id)" v-show="basicinfo.state == 'wait' || basicinfo.state == 'rescinded' || basicinfo.state == 'had_reset'">
                      <span class="fa fa-edit"></span>
                      <span>编辑</span>
                    </span>
                  </div>
                  <div class="project-sublist">
                    <ul class="ul-list">
                      <li class="mui-table-view-cell">
                        <span>项目编号：</span>
                        <span class="list-text">{{basicinfo.number}}</span>
                      </li>
                      <li class="mui-table-view-cell">
                        <span>招标时间：</span>
                        <span class="list-text">{{forMatTime(basicinfo.invitation_time, 'YYYY.MM.DD')}}</span>
                      </li>
                      <li class="mui-table-view-cell">
                        <span>交付时间：</span>
                        <span class="list-text">{{forMatTime(basicinfo.delivery_time, 'YYYY.MM.DD')}}</span>
                      </li>
                      <li class="mui-table-view-cell">
                        <span>项目类型：</span>
                        <span class="list-text">{{filterProType(basicinfo.category)}}</span>
                      </li>
                      <li class="mui-table-view-cell">
                        <span>产品品类：</span>
                        <span class="list-text">{{progoodstyepstr}}</span>
                      </li>
                      <li class="mui-table-view-cell">
                        <span>项目介绍：</span>
                        <span class="list-text">{{basicinfo.intro}}</span>
                      </li>
                      <li class="mui-table-view-cell">
                        <span>风险分析：</span>
                        <span class="list-text">{{basicinfo.risk_analysis}}</span>
                      </li>
                      <li class="mui-table-view-cell">
                        <span>项目备注：</span>
                        <span class="list-text">{{basicinfo.remark}}</span>
                      </li>
                      <li class="mui-table-view-cell">
                        <span>上传附件：</span>
                        <p class="attach-list">
                          <img :src="sub.file_url" v-for="sub in (basicinfo.project_rel_project_attachment || {}).items">
                        </p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="line-box"></div>
                <div class="basic-box">
                  <div class="sub-detail-box">
                    <label>甲方信息</label>
                    <span class="edit-icon" @click="editBuyer(basicinfo.id)" v-show="basicinfo.state == 'wait' || basicinfo.state == 'rescinded' || basicinfo.state == 'had_reset'">
                      <span class="fa fa-edit"></span>
                      <span>编辑</span>
                    </span>
                  </div>
                  <div class="project-sublist">
                    <ul class="ul-list">
                      <li class="mui-table-view-cell">
                        <span>所属区域：</span>
                        <span class="alist-text">{{(basicinfo.first_party_province_poi_province || {}).ProvinceName}}-{{(basicinfo.first_party_city_poi_city || {}).CityName}}-{{(basicinfo.first_party_district_poi_district || {}).DistrictName}}</span>
                      </li>
                      <li class="mui-table-view-cell">
                        <span>联系人姓名：</span>
                        <span class="alist-text">{{basicinfo.first_party_linkman}}</span>
                      </li>
                      <li class="mui-table-view-cell">
                        <span>联系人职务：</span>
                        <span class="alist-text">{{basicinfo.first_party_job}}</span>
                      </li>
                      <li class="mui-table-view-cell">
                        <span>联系人电话：</span>
                        <span class="alist-text">{{basicinfo.first_party_tel}}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="line-box"></div>
                <div class="basic-box">
                  <div class="sub-detail-box">
                    <label>报备人信息</label>
                    <span class="edit-icon" @click="editReport(reportman.id)" v-show="basicinfo.state == 'wait' || basicinfo.state == 'rescinded' || basicinfo.state == 'had_reset'">
                      <span class="fa fa-edit"></span>
                      <span>编辑</span>
                    </span>
                  </div>
                  <div class="project-sublist">
                    <ul class="ul-list">
                      <li class="mui-table-view-cell">
                        <span>姓名：</span>
                        <span class="alist-text">{{reportman.name}}</span>
                      </li>
                      <li class="mui-table-view-cell">
                        <span>项目关系：</span>
                        <span class="alist-text">{{reportman.project_relation}}</span>
                      </li>
                      <li class="mui-table-view-cell">
                        <span>期望提成：</span>
                        <span class="alist-text">{{reportman.royalties_expectation ? reportman.royalties_expectation + '%' : ''}}</span>
                      </li>
                      <li class="mui-table-view-cell">
                        <span>项目优势：</span>
                        <span class="alist-text">{{reportman.strengths}}</span>
                      </li>
                      <li class="mui-table-view-cell">
                        <span>联系电话：</span>
                        <span class="alist-text">{{reportman.tel}}</span>
                      </li>
                      <li class="mui-table-view-cell">
                        <span>联系邮箱：</span>
                        <span class="alist-text">{{reportman.email}}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="line-box"></div>
                <div class="basic-box">
                  <div class="sub-detail-box">
                    <label>竞争信息</label>
                    <span class="edit-icon" @click="editCompetitors(basicinfo.id)" v-show="basicinfo.state == 'wait' || basicinfo.state == 'rescinded' || basicinfo.state == 'had_reset'">
                      <span class="fa fa-edit"></span>
                      <span>编辑</span>
                    </span>
                  </div>
                  <div class="project-sublist">
                    <ul class="ul-list">
                      <li class="mui-table-view-cell">
                        <span>乙方对手：</span>
                        <span class="alist-text">{{basicinfo.second_party_competitor}}</span>
                      </li>
                      <li class="mui-table-view-cell">
                        <span>竞争对手：</span>
                        <span class="alist-text">{{basicinfo.competitor}}</span>
                      </li>
                      <li class="mui-table-view-cell">
                        <span>项目亮点：</span>
                        <span class="alist-text">{{basicinfo.competitor_strengths}}</span>
                      </li>
                      <li class="mui-table-view-cell">
                        <span>形式预测：</span>
                        <span class="alist-text">{{basicinfo.competitor_projections}}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div id="reportrecord" class="mui-control-content">
                <div class="record-box">
                  <ul>
                    <li v-for="(sub, num) in reportLoglist">
                      <div class="li-box" v-bind:class="num == 0 ? 'first' : ''">
                        <p>
                          <span class="last-white-line" v-show="num == (reportLoglist.length - 1)"></span>
                          <span class="pointer"></span>
                          <span>{{sub.operator}}</span>
                          <span>{{sub.text}}</span>
                          <span>了项目</span>
                          <span v-show="sub.flow_remark">[备注]{{sub.flow_remark}}</span>
                        </p>
                        <p>{{forMatTime(sub.create_time, 'YYYY-MM-DD HH:mm:ss')}}</p>
                      </div>
                    </li>
                  </ul>
                </div>
                <p class="no-data" v-show="reportLoglist.length == 0">您还没有报备项目,暂无报备日志哦~</p>
              </div>
              <div id="reportlog" class="mui-control-content">
                <div class="record-box">
                  <ul>
                    <li>
                      <div class="li-box add-item">
                        <p>
                          <span class="white-line"></span>
                          <span class="pointer"></span>
                          <span class="dashed-line"></span>
                          <span class="add-btn" @click="addRecord(basicinfo.id)">
                            <span class="icon">+</span>
                            <span>进度跟踪</span>
                          </span>
                        </p>
                      </div>
                    </li>
                    <li v-for="(sub, num) in recordLoglist">
                      <div class="li-box" v-bind:class="num == 0 ? 'first' : ''">
                        <p>
                          <span class="last-white-line" v-show="num == (recordLoglist.length - 1)"></span>
                          <span class="pointer"></span>
                          <span>{{sub.remark}}</span>
                        </p>
                        <p>{{forMatTime(sub.create_time)}}</p>
                      </div>
                    </li>
                    <li v-show="recordLoglist.length == 0">
                      <div class="li-box">
                        <p>
                          <span class="last-white-line"></span>
                          <span class="pointer"></span>
                          <span>您还没有添加任务项目跟踪记录~</span>
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
                <p class="no-data" v-show="recordLoglist.length == 0"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="activeTab == 'editbasic'" class="subbox-show record-show">
      <div class="subbox-show">
        <header class="mui-bar mui-bar-nav">
          <a class="mui-icon mui-icon-left-nav mui-pull-left go-back" @click="goBack()">返回</a>
          <span class="fa close-icon" @click="goHome()">×</span>
          <h1 class="mui-title othertitle">编辑必要信息</h1>
          <a class="mui-icon mui-pull-right save-btn" @click="confEditBasic()">提交</a>
        </header>
        <div class="textarea-box">
          <div class="line-box"></div>
          <div class="must">
            <div class="mui-input-row sub-input-box">
              <label>项目名称<span>*</span></label>
              <input type="text" placeholder="输入项目名称" v-model="editbaisc.name">
            </div>
            <div class="mui-input-row sub-input-box">
              <label>甲方名称<span>*</span></label>
              <input type="text" placeholder="输入甲方名称" v-model="editbaisc.first_party_name">
            </div>
            <div class="mui-input-row sub-input-box">
              <label>项目金额<span>*</span></label>
              <input type="text" placeholder="万元" v-model="editbaisc.amount">
            </div>
            <div class="mui-input-row sub-input-box edit-basic-box">
              <label>项目可行性<span>*</span></label>
              <div class="stars-style">
                <span class="star-box">
                  <i class="fa mui-icon mui-icon-left-nav mui-pull-right" @click="getStar(sub)"  v-for="sub in stars" aria-hidden="true" v-bind:class="sub <= editbaisc.feasibility ? 'fa-star' : 'fa-star-o'"></i>
                </span>
              </div>
            </div>
            <div class="mui-input-row sub-input-box">
              <label>有效期<span>*</span></label>
              <span class="area-text" @click="changeProValtime()">{{editbaisc.validity_text}}</span>
            </div>
            <div class="mui-input-row sub-input-box">
              <label>简单描述<span>*</span></label>
              <input type="text" placeholder="输入简单描述" v-model="editbaisc.sketch">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-show="activeTab == 'record'" class="subbox-show record-show">
      <header class="mui-bar mui-bar-nav">
        <a class="mui-icon mui-icon-left-nav mui-pull-left go-back" @click="goBack()">返回</a>
        <span class="fa close-icon" @click="goHome()">×</span>
        <h1 class="mui-title othertitle">进度跟踪</h1>
        <a class="mui-icon mui-pull-right save-btn" @click="confAddRecord()">提交</a>
      </header>
      <div class="textarea-box">
        <div class="line-box"></div>
        <div class="text-input">
          <textarea type="text" v-model="recordtext"  class="mui-input-clear" placeholder="请输入最新的跟踪记录"></textarea>
        </div>
      </div>
    </div>
    <div v-show="activeTab == 'editproject'" class="subbox-show">
      <header class="mui-bar mui-bar-nav">
        <a class="mui-icon mui-icon-left-nav mui-pull-left go-back" @click="goBack()">返回</a>
        <span class="fa close-icon" @click="goHome()">×</span>
        <h1 class="mui-title othertitle">编辑项目信息</h1>
        <a class="mui-icon mui-pull-right save-btn" @click="confEditPro()">提交</a>
      </header>
      <div class="textarea-box">
        <div class="line-box"></div>
        <div>
          <div class="mui-input-row sub-input-box">
						<label>项目编号</label>
						<input type="text" placeholder="输入项目编号" v-model="editpro.number">
					</div>
          <div class="mui-input-row sub-input-box">
						<label>招标时间</label>
            <span class="area-text" @click="changeTime('invitation')">{{editpro.invitation_time}}</span>
					</div>
          <div class="mui-input-row sub-input-box">
						<label>交付时间</label>
            <span class="area-text" @click="changeTime('delivery')">{{editpro.delivery_time}}</span>
					</div>
          <div class="mui-input-row sub-input-box">
						<label>产品品类</label>
            <span class="area-text" @click="changeGoodsType()">{{editpro.type}}</span>
					</div>
          <div class="mui-input-row sub-input-box">
						<label>项目类型</label>
            <span class="area-text" @click="changeProType()">{{editpro.category}}</span>
					</div>
          <div class="mui-input-row sub-input-box mui-navigate-right" @click="editText('intro','编辑项目介绍')">
						<label>项目介绍</label>
            <span class="area-text sub-input-text">{{String(editpro.intro).length > 16 ? String(editpro.intro).substring(0, 16) + '...': String(editpro.intro)}}</span>
					</div>
          <div class="mui-input-row sub-input-box mui-navigate-right" @click="editText('risk_analysis','编辑风险分析')">
						<label>风险分析</label>
            <span class="area-text sub-input-text">{{String(editpro.risk_analysis).length > 16 ? String(editpro.risk_analysis).substring(0, 16) + '...': String(editpro.risk_analysis)}}</span>
					</div>
          <div class="mui-input-row sub-input-box mui-navigate-right" @click="editText('remark','编辑项目备注')">
						<label>项目备注</label>
            <span class="area-text sub-input-text">{{String(editpro.remark).length > 16 ? String(editpro.remark).substring(0, 16) + '...': String(editpro.remark)}}</span>
					</div>
          <div class="mui-input-row sub-input-box attach-box">
						<label>附件信息</label>
            <div class="attach-img-box">
              <div class="img-box" v-for="img in editproImg" v-show="img.show">
                <span class="delete-img" @click="deleteImg(img)">×</span>
                <img :src="img.file_url"/>
              </div>
              <span class="upload-box" id="upload_com" @click="upload_com()">
                <span class="add-btn">
                  <i class="fa fa-plus add-icon"></i>
                </span>
                <input class="hidden" type="file" name="files">
              </span>
            </div>
					</div>
        </div>
      </div>
    </div>
    <div v-show="activeTab == 'editbuyer'" class="subbox-show">
      <header class="mui-bar mui-bar-nav">
        <a class="mui-icon mui-icon-left-nav mui-pull-left go-back" @click="goBack()">返回</a>
        <span class="fa close-icon" @click="goHome()">×</span>
        <h1 class="mui-title othertitle">编辑甲方信息</h1>
        <a class="mui-icon mui-pull-right save-btn" @click="confEditBuyer()">提交</a>
      </header>
      <div class="textarea-box">
        <div class="line-box"></div>
        <div>
          <div class="mui-input-row sub-input-box">
						<label>所属区域</label>
            <span class="area-text" @click="changeAre()">{{buyer.area}}</span>
					</div>
          <div class="mui-input-row sub-input-box">
						<label>联系人姓名</label>
						<input type="text" placeholder="输入联系人姓名" v-model="buyer.first_party_linkman">
					</div>
          <div class="mui-input-row sub-input-box">
						<label>联系人职务</label>
						<input type="text" placeholder="输入联系人职务" v-model="buyer.first_party_job">
					</div>
          <div class="mui-input-row sub-input-box">
						<label>联系人电话</label>
						<input type="text" placeholder="输入联系人电话" v-model="buyer.first_party_tel">
					</div>
        </div>
      </div>
    </div>
    <div v-show="activeTab == 'editreport'" class="subbox-show">
      <vue-editreport :report="reporter" @getEditReport="confEditReport"></vue-editreport>
    </div>
    <div v-show="activeTab == 'editcompetitors'" class="subbox-show">
      <header class="mui-bar mui-bar-nav">
        <a class="mui-icon mui-icon-left-nav mui-pull-left go-back" @click="goBack()">返回</a>
        <span class="fa close-icon" @click="goHome()">×</span>
        <h1 class="mui-title othertitle">编辑竞争信息</h1>
        <a class="mui-icon mui-pull-right save-btn" @click="confEditComp()">提交</a>
      </header>
      <div class="textarea-box">
        <div class="line-box"></div>
        <div>
          <div class="mui-input-row sub-input-box mui-navigate-right" @click="enterOtherCompete('second_party_competitor','乙方竞争对手')">
						<label>乙方对手</label>
            <span class="area-text sub-input-text">{{competitors.second_party_competitor}}</span>
					</div>
          <div class="mui-input-row sub-input-box mui-navigate-right" @click="enterOtherCompete('competitor','报备人对手')">
						<label>竞争对手</label>
            <span class="area-text sub-input-text">{{competitors.competitor}}</span>
					</div>
          <div class="mui-input-row sub-input-box">
						<label>项目亮点</label>
						<input type="text" placeholder="输入项目亮点" v-model="competitors.competitor_strengths">
					</div>
          <div class="mui-input-row sub-input-box">
						<label>形式预测</label>
						<input type="text" placeholder="输入形式预测" v-model="competitors.competitor_projections">
					</div>
        </div>
      </div>
    </div>
    <div v-show="activeTab == 'editcomp'" class="subbox-show">
      <header class="mui-bar mui-bar-nav">
        <a class="mui-icon mui-icon-left-nav mui-pull-left sub-go-back" @click="goSubBack()">返回</a>
        <span class="fa close-icon" @click="goHome()">×</span>
        <h1 class="mui-title otherCompetetitle">{{editcomtitle}}</h1>
        <a class="mui-icon mui-pull-right save-btn" @click="endOtherCompete()">提交</a>
      </header>
      <ul class="mui-table-view mui-table-view-chevron textarea-box">
        <li class="mui-table-view-cell comter-item" v-for="(item, num) in jzds">
          <div class="jzztitele">第{{num+1}}竞争者</div>
          <div class="mui-input-row input-com-box" style="width:100%;float:left;">
            <input maxlength="20" type="text" class="sub-com-input" v-model="item.value"/> 
          </div>
          <div v-show="num != 0" class="fa fa-trash delete-icon" @click="deletejzz(num)"></div>
        </li>
        <li class="add-item">
          <span class="addjjz" @click="addjjz()" v-show="jzds.length < 3">添加竞争者</span>
        </li>
      </ul>
    </div>
    <div>
      <vue-area :areaobj="areaobj" :arr="areaarr" @getLayerThree="getArea"></vue-area>
      <vue-one :oneobj="oneobj" :onearr="protypearrs" @getLayerOne="getVueOneInfo"></vue-one>
    </div>
    <div class="classify-box" id="classifylist">
      <div class="sub-classify">
        <div class="null-box" @click="cancelModal()"></div>
        <div class="clasify-item" v-for="item in classifyArr">
          <p class="title">
            <label>{{item.sp_type_name}}</label>
            <a href="javascript:;" @click="showAllTypes(item)">
              <span>{{item.showall ? '收起' : '全部'}}</span>
              <span class="fa" v-bind:class="item.showall ? 'fa-angle-up' : 'fa-angle-down'"></span>
            </a>
          </p>
          <ul class="items-ul">
            <li v-bind:class="sub.active ? 'active' : ''" v-for="(sub, index) in item.furniture_types" @click="choiceType(sub)" v-show="index < 3 || item.showall">
              <a href="javascript:;" :title="sub.type_name">{{sub.type_name}}</a>
            </li>
          </ul>
        </div>
        <div class="clasify-btn">
          <a href="javascript:;" @click="resetClassify()">重置</a>
          <a href="javascript:;" class="submit-btn" @click="setClassify()">完成</a>
        </div>
      </div>
    </div>
    <div v-show="activeTab == 'edittextarea'" class="subbox-show">
      <header class="mui-bar mui-bar-nav">
        <a class="mui-icon mui-icon-left-nav mui-pull-left go-back" @click="goEditBack()">返回</a>
        <span class="fa close-icon" @click="goHome()">×</span>
        <h1 class="mui-title othertitle">{{edittextareaobj.title}}</h1>
        <a class="mui-icon mui-pull-right save-btn" @click="confEditTextarea()">提交</a>
      </header>
      <div class="textarea-box edit-box">
        <div class="edittext">
          <textarea type="text" class="" v-model="edittextareaobj.content" placeholder="最多输入500个字符"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from '~/plugins/axios'
import Area from '../common/threelayer.vue'
import proType from '../common/onelayer.vue'
import editReportvue from './_editreport.vue'
let ESVal = require('es-validate')
let dateJson = require('~/static/js/date.json')
let url = require('url')
let querystring = require('querystring')
let $ = require('jquery')
let _ = require('underscore')
let Cookies = require('js-cookie')
let moment = require('moment')
let model
let proId
let proTypeArr = [] // 项目类型
let proValTime = [] // 项目有效期
let activeTypeIds = [] // 产品品类
let updateTypeArr = [] // 提交的项目类型数组
let reportState = [
  {
    key: 'had_reset',
    value: '驳回'
  },
  {
    key: 'adopt',
    value: '采纳'
  },
  {
    key: 'reject',
    value: '拒绝'
  },
  {
    key: 'had_handle',
    value: '受理'
  },
  {
    key: 'wait_handle',
    value: '报备'
  },
  {
    key: 'wait',
    value: '新建'
  },
  {
    key: 'rescinded',
    value: '撤回'
  }
]
export default {
  data () {
    return {
      getmoreopt: false,
      layer: 'area',
      editbaisc: {},
      areaarr: [],
      areaobj: {
        state: 0
      },
      oneobj: {
        state: 0
      },
      protypearrs: [],
      activeTab: 'home',
      basicinfo: {},
      reportman: {},
      linkPath: '',
      stars: [5, 4, 3, 2, 1],
      recordtext: '',
      reportLoglist: [],
      recordLoglist: [],
      editpro: {},
      editproImg: [],
      reporter: {},
      buyer: {},
      competitors: {},
      classifyArr: [],
      progoodstyepstr: '',
      editcomtitle: '', // 编辑竞争者、竞争对手（标题）
      editcomtstr: '', // 编辑竞争者、竞争对手字段
      jzds: [], // 竞争者
      edittextareaobj: { // 编辑多文字
        key: '', // 关键字
        title: '', // 标题
        content: '' // 内容
      }
    }
  },
  components: {
    'vue-area': Area,
    'vue-one': proType,
    'vue-editreport': editReportvue
  },
  methods: {
    init: async function () {
      let myURL = url.parse(window.location.href)
      model.linkPath = '/' + myURL.pathname.split('/')[1]
      let urlObj = querystring.parse(myURL.query)
      let rel = {
        relation: [
          {
            table: 'project_reportman',
            key: 'project_poi_projects',
            include: [
              {
                table: 'user_poi_reportman'
              }
            ]
          },
          {
            table: 'project_attachment',
            key: 'project_poi_projects'
          },
          {
            table: 'project_furniture_types',
            key: 'project_poi_projects'
          }
        ],
        include: [
          {
            table: 'first_party_province_poi_province'
          },
          {
            table: 'first_party_city_poi_city'
          },
          {
            table: 'first_party_district_poi_district'
          }
        ]
      }
      let getresult = await axios.get('classes/projects?id=' + urlObj.id, {
        params: {
          with: rel
        }
      })
      let arr = []
      getresult.data.project_rel_project_furniture_types.items.forEach((item) => {
        arr.push(item.name)
      })
      model.progoodstyepstr = arr.join('-')
      model.basicinfo = getresult.data
      model.reportman = ((getresult.data.project_rel_project_reportman || {}).items || [])[0] || {}
      await model.getReportLog(urlObj.id)
      await model.getRecordLog(urlObj.id)
    },

    // 编辑textarea
    editText: function (key, title) {
      model.activeTab = 'edittextarea'
      model.edittextareaobj = {
        key: key,
        title: title,
        content: model.editpro[key]
      }
    },

    // 保存多文字编辑
    confEditTextarea: function () {
      model.activeTab = 'editproject'
      model.editpro[model.edittextareaobj.key] = model.edittextareaobj.content
    },

    // 编辑多文字返回
    goEditBack: function () {
      model.activeTab = 'editproject'
    },

    // 编辑必填信息
    editBasic: function (id) {
      proId = id
      model.editbaisc = {
        name: model.basicinfo.name,
        first_party_name: model.basicinfo.first_party_name,
        amount: model.basicinfo.amount,
        feasibility: model.basicinfo.feasibility,
        validity: model.basicinfo.validity,
        validity_text: model.valtimeFilter(model.basicinfo.validity),
        sketch: model.basicinfo.sketch
      }
      model.protypearrs = proValTime
      model.activeTab = 'editbasic'
    },

    ValidateForm: function (data) {
      let result = ESVal.validate(data, {
        name: {
          required: true,
          msg: '项目名称不能为空!'
        },
        first_party_name: {
          required: true,
          msg: '公司名称不能为空!'
        },
        amount: {
          required: true,
          msg: '预计金额不能为空!'
        },
        sketch: {
          required: true,
          msg: '简单描述不能为空!'
        }
      })
      if (!result.status) {
        window.mui.toast(result.msg)
      }
      return result.status
    },

    // 保存必填信息
    confEditBasic: function () {
      let param = {
        id: proId,
        name: model.editbaisc.name,
        first_party_name: model.editbaisc.first_party_name,
        amount: model.editbaisc.amount,
        feasibility: model.editbaisc.feasibility || '',
        validity: model.editbaisc.validity || '',
        sketch: model.editbaisc.sketch || ''
      }
      if (!model.ValidateForm(param)) {
        return false
      }
      axios.put('functions/report/project', null, {
        data: param
      }).then(function (data) {
        model.basicinfo.name = model.editbaisc.name
        model.basicinfo.first_party_name = model.editbaisc.first_party_name
        model.basicinfo.amount = model.editbaisc.amount
        model.basicinfo.feasibility = model.editbaisc.feasibility
        model.basicinfo.validity = model.editbaisc.validity
        model.basicinfo.sketch = model.editbaisc.sketch
        window.mui.toast('编辑必填信息成功')
        setTimeout(function () {
          model.activeTab = 'home'
        }, 1000)
      }).catch(function (error) {
        if (error.response.data.message === 'token is invalid') {
          window.mui.toast('登录信息过期!')
          setTimeout(function () {
            Cookies.set('dpjia-hall-token', '')
            window.location.reload()
          }, 2000)
        }
      })
    },

    // 选择可行性
    getStar: function (num) {
      model.editbaisc.feasibility = num
    },

    // 有效期
    changeProValtime: function () {
      model.protypearrs = proValTime
      model.oneobj.state = Math.random()
    },

    // 去报备
    gotoReport: function () {
      axios.post('functions/report/record', null, {
        data: {id: model.basicinfo.id}
      }).then(function (data) {
        window.mui.toast('报备成功')
        model.basicinfo.state = 'wait_handle'
      }).catch(function (error) {
        if (error.response.data.message === 'token is invalid') {
          window.mui.toast('登录信息过期!')
          setTimeout(function () {
            Cookies.set('dpjia-hall-token', '')
            window.location.reload()
          }, 2000)
        }
      })
    },

    // 右上角更多操作
    preMoreOpt: function () {
      model.getmoreopt = !model.getmoreopt
    },

    // 右上角操作函数（撤销、删除）
    optFunc: function (state) {
      let text = (state === 'wait' || state === 'rescinded') ? '删除项目' : '撤回项目'
      var btnArray = ['否', '是']
      window.mui.confirm('确定' + text + '?', '友情提示', btnArray, function (e) {
        if (e.index === 1) {
          if (state === 'wait' || state === 'rescinded') {
            let param = {
              _method: 'DELETE',
              id: model.basicinfo.id
            }
            axios.post('functions/report/project', null, {
              data: param
            }).then(function (data) {
              window.mui.toast(text + '成功!')
              setTimeout(function () {
                window.location.href = model.linkPath + '/report'
              }, 1000)
            }).catch(function (error) {
              if (error.response.data.message === 'token is invalid') {
                window.mui.toast('登录信息过期!')
                setTimeout(function () {
                  Cookies.set('dpjia-hall-token', '')
                  window.location.href = model.linkPath + '/login'
                }, 2000)
              }
            })
          } else {
            let param = {
              id: model.basicinfo.id
            }
            axios.post('functions/report/revoke', null, {
              data: param
            }).then(function (data) {
              window.mui.toast(text + '成功!')
              setTimeout(function () {
                model.init()
              }, 1000)
            }).catch(function (error) {
              if (error.response.data.message === 'token is invalid') {
                window.mui.toast('登录信息过期!')
                setTimeout(function () {
                  Cookies.set('dpjia-hall-token', '')
                  window.location.href = model.linkPath + '/login'
                }, 2000)
              }
            })
          }
        }
        model.getmoreopt = false
        return false
      })
    },

    // 获取报备记录
    getReportLog: async function (id) {
      let param = {
        flow_id: 36,
        id: id,
        order: '-id',
        report_name: model.basicinfo.name
      }
      let result = await axios.get('functions/report/record', {
        params: param
      })
      result.data.items.forEach((item) => {
        reportState.forEach((sub) => {
          if (item.flow_state === sub.key) {
            item.text = sub.value
          }
        })
      })
      model.reportLoglist = result.data.items
    },

    // 获取项目跟踪记录
    getRecordLog: async function (id) {
      let param = {
        where: {
          project_poi_projects: id
        },
        order: '-id'
      }
      let result = await axios.get('classes/project_track', {
        params: param
      })
      model.recordLoglist = result.data.items
    },

    // 添加跟踪记录页面的返回
    goBack: function () {
      model.recordtext = ''
      model.activeTab = 'home'
    },

    // 返回首页(云展厅)
    goHome: function () {
      window.location.href = model.linkPath + '/'
    },

    // 添加跟踪记录
    addRecord: async function (id) {
      model.recordtext = ''
      model.activeTab = 'record'
      proId = id
    },

    // 确定添加跟踪记录
    confAddRecord: function () {
      if (!model.recordtext) {
        window.mui.toast('跟踪记录为空！')
        return
      }
      let param = {
        project_poi_projects: proId,
        remark: model.recordtext
      }
      axios.post('functions/report/project_track', null, {
        data: param
      }).then(function (data) {
        model.recordLoglist.unshift(data.data)
        window.mui.toast('添加跟踪记录成功！')
        setTimeout(function () {
          model.activeTab = 'home'
        }, 1000)
      }).catch(function (error) {
        if (error.response.data.message === 'token is invalid') {
          window.mui.toast('登录信息过期!')
          setTimeout(function () {
            Cookies.set('dpjia-hall-token', '')
            window.location.href = model.linkPath + '/login'
          }, 2000)
        }
      })
    },

    // 时间格式化
    forMatTime: function (value, type) {
      if (_.isEmpty(value) || parseInt(value) === 0) { return '' }
      moment.locale('Chinese (Simplified)')
      let timetype = type || 'YYYY-MM-DD HH:mm:ss'
      return moment(parseInt(value)).format(timetype)
    },

    // 项目类型过滤
    filterProType: function (str) {
      let res = ''
      proTypeArr.forEach((item) => {
        if (str === item.value) {
          res = item.text
        }
      })
      return res
    },

    // 获取项目常量信息
    getPorState: async function () {
      let param = {
        where: JSON.stringify({
          state_types: {
            $in: ['report_projecttype', 'report_valtime', 'report_state']
          }
        })
      }
      let res = await axios.get('classes/selectable_states', {params: param})
      res.data.items.forEach((item) => {
        // 项目类型
        if (item.state_types === 'report_projecttype') {
          let tmp = {
            'text': item.alias,
            'value': item.name
          }
          proTypeArr.push(tmp)
        }
        // 项目有效期
        if (item.state_types === 'report_valtime') {
          let tmp = {
            'text': item.alias,
            'value': item.name
          }
          proValTime.push(tmp)
        }
      })
    },

    // 有效期过滤
    valtimeFilter: function (str) {
      let res = ''
      proValTime.forEach((item) => {
        if (item.value === str) {
          res = item.text
        }
      })
      return res
    },

    // 编辑产品品类
    filterGoodsType: function (arr) {
      let res = ''
      let subarr = []
      arr.forEach((item) => {
        let tmp = {
          id: item.id,
          delete: 'no',
          name: item.name,
          type_poi_furniture_types: item.type_poi_furniture_types
        }
        updateTypeArr.push(tmp)
        activeTypeIds.push(item.type_poi_furniture_types)
        subarr.push(item.name)
      })
      res = subarr.join('-')
      return res
    },

    // 显示各分类全部（收起）
    showAllTypes: function (obj) {
      obj.showall = !obj.showall
    },

    // 选择三级分类
    choiceType: function (obj) {
      if (obj.active) {
        obj.active = false
        activeTypeIds = _.without(activeTypeIds, obj.id)
        updateTypeArr.forEach((item) => {
          if (obj.id === item.type_poi_furniture_types) {
            item.delete = 'yes'
          }
        })
      } else {
        obj.active = true
        activeTypeIds.unshift(obj.id)
        let tmp = {
          id: 0,
          delete: 'no',
          name: obj.type_name,
          type_poi_furniture_types: obj.id
        }
        updateTypeArr.unshift(tmp)
      }
    },

    // 点击空白消失选择宽
    cancelModal: function () {
      $('#classifylist').hide()
    },

    // 重置
    resetClassify: function () {
      model.classifyArr.forEach((p) => {
        p.furniture_types.forEach((sub) => {
          sub.active = false
        })
      })
      updateTypeArr.forEach((item) => {
        item.delete = 'yes'
      })
      activeTypeIds = []
    },

    // 完成三级分类
    setClassify: function () {
      let tmp = []
      model.classifyArr.forEach((p) => {
        p.furniture_types.forEach((sub) => {
          if (activeTypeIds.indexOf(sub.id) > -1) {
            tmp.push(sub.type_name)
          }
        })
      })
      model.editpro.type = tmp.join('-')
      $('#classifylist').hide()
    },

    // 编辑项目信息
    editProject: function (id) {
      model.editpro = {
        number: model.basicinfo.number,
        invitation_time: model.forMatTime(model.basicinfo.invitation_time, 'YYYY-MM-DD'),
        delivery_time: model.forMatTime(model.basicinfo.delivery_time, 'YYYY-MM-DD'),
        type: model.filterGoodsType(model.basicinfo.project_rel_project_furniture_types.items),
        category: model.filterProType(model.basicinfo.category),
        category_str: model.basicinfo.category,
        intro: model.basicinfo.intro,
        risk_analysis: model.basicinfo.risk_analysis,
        remark: model.basicinfo.remark
      }
      let tmparr = []
      if (model.basicinfo.project_rel_project_attachment.count > 0) {
        model.basicinfo.project_rel_project_attachment.items.forEach((item) => {
          let tmp = {
            id: item.id,
            delete: 'no',
            file_url: item.file_url,
            show: true
          }
          tmparr.push(tmp)
        })
      }
      model.editproImg = tmparr
      model.activeTab = 'editproject'
      proId = id
    },

    // 保存项目信息
    confEditPro: function () {
      let param = {
        id: proId,
        number: model.editpro.number,
        invitation_time: model.editpro.invitation_time || '0',
        delivery_time: model.editpro.delivery_time || '0',
        project_furniture_types: JSON.stringify(updateTypeArr),
        category: model.editpro.category_str,
        intro: model.editpro.intro,
        risk_analysis: model.editpro.risk_analysis,
        remark: model.editpro.remark,
        project_attachment: JSON.stringify(model.editproImg)
      }
      axios.put('functions/report/project', null, {
        data: param
      }).then(function (data) {
        window.mui.toast('编辑项目信息成功')
        setTimeout(function () {
          location.reload()
        }, 1000)
        model.init()
      }).catch(function (error) {
        if (error.response.data.message === 'token is invalid') {
          window.mui.toast('登录信息过期!')
          setTimeout(function () {
            Cookies.set('dpjia-hall-token', '')
            window.location.href = model.linkPath + '/login'
          }, 2000)
        }
      })
    },

    // 招标时间
    changeTime: function (str) {
      model.layer = str
      model.areaarr = dateJson
      model.areaobj.state = Math.random()
    },

    // 项目类型
    changeProType: function () {
      model.protypearrs = proTypeArr
      model.oneobj.state = Math.random()
    },

    // get项目类型
    getVueOneInfo: function (str) {
      // 编辑必填信息
      if (model.activeTab === 'editbasic') {
        model.editbaisc.validity = str[0].value
        model.editbaisc.validity_text = str[0].text
      }
      // 编辑基本信息
      if (model.activeTab === 'editproject') {
        model.editpro.category_str = str[0].value
        model.editpro.category = str[0].text
      }
    },

    // 删除项目附件图片
    deleteImg: function (obj) {
      if (obj.id > 0) {
        obj.delete = 'yes'
        obj.show = false
      } else {
        model.editproImg = _.without(model.editproImg, obj)
      }
    },

    // 产品品类
    changeGoodsType: async function () {
      let res = await axios.get('functions/furnitures/furniture_types', {params: ''})
      res.data.forEach((item) => {
        item.showall = false
        item.furniture_types.forEach((sub) => {
          if (activeTypeIds.indexOf(sub.id) > -1) {
            sub.active = true
          } else {
            sub.active = false
          }
        })
      })
      model.classifyArr = res.data
      $('#classifylist').show()
      $('#classifylist').addClass('animated bounceInRight')
    },

    // 编辑甲方信息
    editBuyer: function (id) {
      model.buyer = {
        area: (model.basicinfo.first_party_province_poi_province || {}).ProvinceName + '-' + (model.basicinfo.first_party_city_poi_city || {}).CityName + '-' + (model.basicinfo.first_party_district_poi_district || {}).DistrictName,
        pro_id: (model.basicinfo.first_party_province_poi_province || {}).id,
        city_id: (model.basicinfo.first_party_city_poi_city || {}).id,
        dis_id: (model.basicinfo.first_party_district_poi_district || {}).id,
        first_party_linkman: model.basicinfo.first_party_linkman,
        first_party_job: model.basicinfo.first_party_job,
        first_party_tel: model.basicinfo.first_party_tel
      }
      model.activeTab = 'editbuyer'
      proId = id
    },

    // 选择地区
    changeAre: function () {
      model.layer = 'area'
      model.areaarr = []
      model.areaobj.state = Math.random()
    },

    // 获取选择地区信息
    getArea: function (str) {
      // 省市区
      if (model.layer === 'area') {
        model.buyer.area = str[0].text + '-' + str[1].text + '-' + str[2].text
        model.buyer.pro_id = str[0].value || 1
        model.buyer.city_id = str[1].value || 1
        model.buyer.dis_id = str[2].value || 1
      }
      // 招标时间
      if (model.layer === 'invitation') {
        model.editpro.invitation_time = str[0].text + '-' + str[1].text + '-' + str[2].text
      }
      // 交付时间
      if (model.layer === 'delivery') {
        model.editpro.delivery_time = str[0].text + '-' + str[1].text + '-' + str[2].text
      }
    },

    // 确认保存甲方信息
    confEditBuyer: function () {
      let telval = /^1[3|4|5|7|8][0-9]{9}$/
      if (!_.isEmpty(model.buyer.first_party_tel)) {
        if (!telval.test(model.buyer.first_party_tel)) {
          window.mui.toast('手机号格式错误!')
          return false
        }
      }
      let param = {
        id: proId,
        first_party_province_poi_province: model.buyer.pro_id,
        first_party_city_poi_city: model.buyer.city_id,
        first_party_district_poi_district: model.buyer.dis_id,
        first_party_linkman: model.buyer.first_party_linkman || '',
        first_party_job: model.buyer.first_party_job || '',
        first_party_tel: model.buyer.first_party_tel || ''
      }
      axios.put('functions/report/project', null, {
        data: param
      }).then(function (data) {
        model.basicinfo.first_party_province_poi_province = {
          id: model.buyer.pro_id,
          ProvinceName: model.buyer.area.split('-')[0]
        }
        model.basicinfo.first_party_city_poi_city = {
          id: model.buyer.city_id,
          CityName: model.buyer.area.split('-')[1]
        }
        model.basicinfo.first_party_district_poi_district = {
          id: model.buyer.dis_id,
          DistrictName: model.buyer.area.split('-')[2]
        }
        model.basicinfo.first_party_linkman = model.buyer.first_party_linkman
        model.basicinfo.first_party_job = model.buyer.first_party_job
        model.basicinfo.first_party_tel = model.buyer.first_party_tel
        window.mui.toast('编辑甲方信息成功')
        setTimeout(function () {
          model.activeTab = 'home'
        }, 1000)
      }).catch(function (error) {
        if (error.response.data.message === 'token is invalid') {
          window.mui.toast('登录信息过期!')
          setTimeout(function () {
            Cookies.set('dpjia-hall-token', '')
            window.location.href = model.linkPath + '/login'
          }, 2000)
        }
      })
    },

    // 编辑竞争对手
    enterOtherCompete: function (str, title) {
      model.jzds = []
      model.editcomtstr = str
      model.activeTab = 'editcomp'
      model.editcomtitle = title
      let arr = (model.competitors[str]).split(',')
      if (arr.length > 0) {
        arr.forEach((sub) => {
          let obj = {
            value: sub
          }
          model.jzds.push(obj)
        })
      }
    },

    // 删除竞争对手
    deletejzz: function (index) {
      model.jzds.splice(index, 1)
    },

    // 添加竞争对手
    addjjz: function () {
      model.jzds.push({value: ''})
    },

    // 竞争对手返回
    goSubBack: function () {
      model.activeTab = 'editcompetitors'
    },

    // 提交竞争对手
    endOtherCompete: function () {
      let arr = []
      model.jzds.forEach((item) => {
        if (!_.isEmpty(item.value)) {
          arr.push(item.value)
        }
      })
      model.competitors[model.editcomtstr] = arr.join(',')
      model.activeTab = 'editcompetitors'
    },

    // 编辑报备人信息
    editReport: function (id) {
      model.reporter = {
        id: id,
        name: model.reportman.name,
        relationship: model.reportman.project_relation,
        commission: model.reportman.royalties_expectation,
        ascendancy: model.reportman.strengths,
        tel: model.reportman.tel,
        email: model.reportman.email,
        goback: false
      }
      model.activeTab = 'editreport'
      proId = id
    },

    // 确定提交报备人信息
    confEditReport: function (obj) {
      if (obj.goback) {
        model.goBack()
        return
      }
      model.reportman = {
        id: proId,
        name: obj.name,
        project_relation: obj.relationship,
        royalties_expectation: obj.commission,
        strengths: obj.ascendancy,
        tel: obj.tel,
        email: obj.email
      }
      window.mui.toast('编辑报备人信息成功')
      setTimeout(function () {
        model.activeTab = 'home'
      }, 1000)
    },

    // 编辑竞争信息
    editCompetitors: function (id) {
      model.competitors = {
        second_party_competitor: model.basicinfo.second_party_competitor,
        competitor: model.basicinfo.competitor,
        competitor_strengths: model.basicinfo.competitor_strengths,
        competitor_projections: model.basicinfo.competitor_projections
      }
      model.activeTab = 'editcompetitors'
      proId = id
    },

    // 确定提交竞争信息
    confEditComp: function () {
      let param = {
        id: proId,
        second_party_competitor: model.competitors.second_party_competitor || '',
        competitor: model.competitors.competitor || '',
        competitor_strengths: model.competitors.competitor_strengths || '',
        competitor_projections: model.competitors.competitor_projections || ''
      }
      axios.put('functions/report/project', null, {
        data: param
      }).then(function (data) {
        model.basicinfo.second_party_competitor = model.competitors.second_party_competitor
        model.basicinfo.competitor = model.competitors.competitor
        model.basicinfo.competitor_strengths = model.competitors.competitor_strengths
        model.basicinfo.competitor_projections = model.competitors.competitor_projections
        window.mui.toast('编辑竞争信息成功')
        setTimeout(function () {
          model.activeTab = 'home'
        }, 1000)
      }).catch(function (error) {
        if (error.response.data.message === 'token is invalid') {
          window.mui.toast('登录信息过期!')
          setTimeout(function () {
            Cookies.set('dpjia-hall-token', '')
            window.location.href = model.linkPath + '/login'
          }, 2000)
        }
      })
    },

    // 上传图片
    upload_com: function () {
      var url = process.env.baseUrl + 'upload' || 'http://192.168.1.120/openapi/api/1.0/upload'
      var $input = $('#upload_com').find('input')
      $input.unbind().click()
      $input.unbind().change(function () {
        if ($input.val() === '') {
          return false
        }
        var form = $("<form class='uploadform' method='post' enctype='multipart/form-data' action='" + url + "'></form>")
        $input.wrap(form)
        window.$('#upload_com').find('form').ajaxSubmit({
          type: 'post',
          url: url,
          data: {
            mode: 'image',
            mutiple: '0'
          },
          crossDomain: true,
          headers: {
            'X-DP-Key': '7748955b16d6f1a02be76db2773dd316',
            'X-DP-ID': '7748955b16d6f1a0'
          },
          success: function (data) {
            $input.unwrap()
            let imgtmp = {
              id: 0,
              delete: 'no',
              file_url: data.url,
              show: true
            }
            model.editproImg.push(imgtmp)
          },
          error: function (error) {
            console.log(error)
          }
        })
      })
    }
  },
  async mounted () {
    model = this
    await model.getPorState()
    await model.init()
  }
}
</script>
<style>
.edit-box {
  background-color: #eee;
}
.edittext textarea {
  min-height: 80px;
  border: none;
   border-bottom: 1px solid #ccc;
   font-size: 14px;
}
.add-item{
  position: relative;
  height: 30px;
}
.addjjz {
  position: absolute;
  bottom: 3px;
  right: 10px;
  font-size: 14px;
  color: #000;
}
.mui-table-view-chevron {
  background-color: #eee;
}
.mui-table-view:before,
.mui-table-view:after {
  background-color: #fff !important;
}
.mui-table-view-cell:after {
  background-color: #fff !important;
}
.comter-item {
  position: relative;
  margin: 0;
  padding: 0;
}
.comter-item .delete-icon {
  position: absolute;
  left: 50%;
  bottom: 8px;
  width: 20px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  color: #f00;
}
.comter-item .jzztitele {
  height: 30px;
  line-height: 30px;
  width: 100%;
  background-color: #eee;
  color: #969696;
  font-size: 14px;
  padding-left: 15px;
}
.comter-item .input-com-box {
  height: 42px;
  line-height: 42px;
}
.comter-item .sub-com-input {
  border: none;
  font-size: 14px;
  color: #999;
}
.mui-title{
  font-weight: 600;
}
.mui-bar-nav{
  height: 48px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  box-shadow: none;
}
.sub-go-back{
  height: 48px;
  line-height: 26px;
  color: #666;
  font-size: 14px!important;
}
.edit-basic-box .stars-style{
  display: inline-block;
  width: 70%;
}
.edit-basic-box .star-box {
  width: 100%;
  float: right;
  padding-right: 10px;
}
.more-opt {
  width: 24px;
  height: 24px;
  position: relative;
  top: 11px;
  cursor: pointer;
}
.svg-style {
  width: 24px;
  height: 24px;
  fill: #666;
}
.sub-opt-box{
  display: inline-block;
  position: absolute;
  right: -3px;
  top: 28px;
  width: 64px;
  text-align: center;
  height: 26px;
  line-height: 26px;
  font-size: 12px;
  border-radius: 3px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
}
.sub-opt-box .triangle {
  position: absolute;
  top: -6px;
  left: 44px;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 6px solid rgba(0, 0, 0, 0.6);
}
.attach-img-box {
  padding-bottom: 10px;
  display: inline-block;
  width: 70%;
  float: right;
}
.upload-box{
  float: left;
  margin-right: 10px;
  margin-top: 10px;
  display: inline-block;
  width: 40px;
  height: 40px;
  text-align: center;
  background-color: #f3f3f3;
  cursor: pointer;
}
.upload-box .add-icon{
  position: relative;
  top: 10px;
  font-size: 22px;
  color: #bebebe;
}
.hidden{
  display: none;
}
.attach-box img {
  width: 40px;
  height: 40px;
}
.attach-box .img-box{
  position: relative;
  display: inline-block;
  float: left;
  width: 40px;
  height: 40px;
  margin-right: 10px;
  margin-top: 10px;
}
.delete-img{
  position: absolute;
  left: -6px;
  top: -6px;
  display: inline-block;
  width: 18px;
  height: 18px;
  line-height: 18px;
  border-radius: 100%;
  text-align: center;
  background-color: #c63e40;
  color: #fff;
  z-index: 999;
  font-size: 14px;
  cursor: pointer;
}
.sub-input-box {
  font-size: 14px;
  border-bottom: 1px solid #ccc;
  color: #999;
}
.sub-input-box label{
  line-height: 18px;
  width: 30%;
  color: #666;
}
.sub-input-box .area-text{
  display: inline-block;
  height: 34px;
  line-height: 34px;
  font-size: 14px;
  padding-right: 10px;
  width: 70%;
  text-align: right;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #999;
}
.sub-input-text {
  position: relative;
  top: 3px;
  right: 26px;
}
.sub-input-box input{
  font-size: 14px;
  width: 70%;
  text-align: right;
  color: #999;
}
.close-icon{
  position: absolute;
  top: 11px;
  left: 66px;
  display: inline-block;
  width: 20px;
  height: 20px;
  font-size: 20px;
  color: #666;
  z-index: 9999;
}
.record-show {
  position: relative;
}
.subbox-show .go-back,
.subbox-show .sub-go-back{
  height: 48px;
  line-height: 26px;
  color: #666;
  font-size: 14px!important;
}
.subbox-show .save-btn{
  position: relative;
  top: 6px;
  color: #5278e5;
  font-size: 14px;
}
.textarea-box{
  position: absolute;
  top: 48px;
  left: 0;
  width: 100%;
  height: calc(100% - 48px);
}
.text-input{
  width: 100%;
  border-bottom: 1px solid #ccc;
}
.text-input textarea{
  display: block;
  width: 100%;
  border: none;
  min-height: 60px;
  margin: 0;
  padding: 10px;
  font-size: 14px;
}
.record-box{
  padding: 10px 20px;
}
.record-box ul,
.record-box ul li{
  list-style: none;
  margin: 0;
  padding: 0;
}
.record-box .add-item{
  border-bottom: none;
}
.record-box .dashed-line{
  position: absolute;
  left: -20px;
  top: 10px;
  display: inline-block;
  width: 20px;
  height: 3px;
  border-top: 1px dashed #ccc;
}
.record-box .white-line {
  position: absolute;
  left: -21px;
  top: -7px;
  display: inline-block;
  width: 3px;
  height: 14px;
  border-left: 1px solid #fff;
}
.last-white-line{
  position: absolute;
  left: -21px;
  top: 9px;
  display: inline-block;
  width: 3px;
  height: 44px;
  border-left: 1px solid #fff;
}
.record-box .add-item .pointer{
  background-color: #5278e5;
  z-index: 100;
}
.add-item .add-btn {
  display: inline-block;
  color: #5278e5;
}
.add-btn .icon{
  display: inline-block;
  width: 14px;
  height: 14px;
  text-align: center;
  line-height: 12px;
  border-radius: 100%;
  background-color: #5278e5;
  margin-right: 5px;
  color: #fff;
}
.record-box ul li{
  border-left: 1px solid #ccc;
  padding-left: 20px;
}
.record-box ul li:last-child .li-box {
  border-bottom: none;
}
.record-box ul li p{
  position: relative;
  margin: 0;
  padding: 0;
}
.li-box {
  padding: 10px 0;
  border-bottom: 1px dashed #ccc;
}
.li-box .pointer{
  position: absolute;
  top: 8px;
  left: -23px;
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 100%;
  background-color: #ccc;
}
.first p{
  color: #666;
  font-size: 16px;
}
.li-box.first .pointer{
  width: 7px;
  height: 7px;
  top: 7px;
  left: -24px;
  background-color: #5278e5;
  box-shadow: 0 0 6px #5278e5;
}
.record-box ul li:nth-child(1) .li-box{
  padding-top: 0;
}
.line-box{
  width: 100%;
  height: 10px;
  background-color: #ebebeb;
}
.no-data{
  margin: 20px 0;
  text-align: center;
  color: #999;
  font-size: 14px;
}
.basic-box {
  padding: 0 10px;
}
.detail-tab{
  padding: 5px 10px;
  background-color: #fff;
  border-radius: 0;
  border: none;
  border-bottom: 1px solid #eee;
}
.detail-tab .mui-control-item{
  position: relative;
  border: none;
  border-left: 1px solid #eee;
  color: #999999;
}
.detail-tab .mui-control-item:nth-child(1){
  border-left: none;
}
.detail-tab .mui-active{
  color: #5278e5 !important;
  background-color: #fff !important;
}
.detail-tab .mui-active .active-icon{
  position: absolute;
  left: 50%;
  bottom: 2px;
  display: inline-block;
  width: 30px;
  height: 4px;
  border-radius: 2px;
  background-color: #5278e5;
  -webkit-transform: translate(-50%, 0);
  -moz-transform: translate(-50%, 0);
  -o-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
}
.detail-body{
  min-height: 180px;
  background-color: #fff;
}
.detail-body .mui-control-content{
  margin-bottom: 40px;
}
.sub-detail-box{
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color: #999;
  border-bottom: 1px dashed #ccc;
}
.sub-detail-box .edit-icon{
  display: inline-block;
  float: right;
  position: relative;
  top: 4px;
  right: 0;
  color: #5278e5;
  cursor: pointer;
}
.project-sublist .ul-list{
  margin: 0;
  padding: 0;
  background-color: #fff;
  padding-bottom: 20px;
}
.project-sublist .ul-list li{
  display: flex;
  font-size: 14px;
  color: #999;
  padding: 5px 0 0 0;
}
.project-sublist .ul-list li:after{
  background-color: #fff;
}
.list-text{
  display: inline-block;
  width: calc(100% - 74px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.alist-text{
  flex-grow: 1;
  display: inline-block;
  width: calc(100% - 90px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.attach-list{
}
.attach-list img{
  width: 40px;
  height: 40px;
  margin-right: 10px;
  margin-bottom: 10px;
}
.detail-box{
  position: absolute;
  top: 44px;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #eeeeee;
}
.basic-info{
  position: relative;
  background-color: #fff;
  margin: 15px;
  border-radius: 5px;
  padding: 20px 10px 10px 10px;
}
.basic-info label {
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  text-align: center;
}
.basic-info .edit-basic {
  position: absolute;
  right: 0;
  top: 40%;
  display: inline-block;
  width: 20px;
  height: 20px;
  color: #eee;
}
.money{
  color: red;
}
.stars-style{
  height: 24px;
  line-height: 24px;
  text-align: center;
  margin-top: 14px;
  margin-bottom: 5px;
}
.stars-style .fa{
  display: inline-block;
  width: 22px;
  height: 22px;
}
.star-box{
  display: block;
  width: 112px;
  height: 24px;
  margin: 0 auto;
}
.fa-star {
  color: #ffb400;
  font-size: 20px;
}
.fa-star-o {
  color: #ccc;
  font-size: 20px;
}
.fz12{
  font-size: 12px;
  text-align: center;
  color: #99999;
}
.fz14 {
  font-size: 14px;
  text-align: center;
  height: 26px;
  line-height: 24px;
  color: #666;
}
.intro-style{
  padding: 0 10px;
  margin-bottom: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.go-report{
  position: relative;
  height: 40px;
  padding-top: 10px;
  border-top: 1px dashed #ccc;
  margin-top: 10px;
}
.go-report a{
  display: block;
  width: 80%;
  height: 33px;
  text-align: center;
  line-height: 33px;
  margin: 0 auto;
  background-color: #5278e5;
  color: #fff;
  border-radius: 50px;
}
.go-report .icon-circle {
  position: absolute;
  top: -10px;
  display: inline-block;
  width: 18px;
  height: 18px;
  border-radius: 100%;
  background-color: #eee;
}
.go-report .left-circle {
  left: -18px;
}
.go-report .right-circle {
  right: -18px;
}
.classify-box{
  display: none;
  position: fixed;
  top: 44px;
  z-index: 1000;
  width: 100%;
  height: calc(100% - 44px);
  background-color: rgba(0, 0, 0, 0.6);
  overflow-y: auto;
}
.sub-classify{
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  min-height: calc(100% - 44px);
  padding: 10px;
  background-color: #fff;
  padding-bottom: 50px;
}
.null-box {
  position: absolute;
  top: 0;
  left: 0;
  display: inline-block;
  width: calc(100% - 276px);
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  float: left;
}
.clasify-item{
  width: 260px;
  float: right;
  margin-bottom: 20px;
}
.clasify-item .title{
  margin: 0;
  padding: 0;
  height: 22px;
  line-height: 22px;
  margin-bottom: 10px;
}
.title > label {
  color: #050505;
}
.title > a{
  float: right;
}
.clasify-item .items-ul{
  margin: 0;
  padding: 4px;
  list-style: none;
}
.clasify-item .items-ul li{
  display: inline-block;
  list-style: none;
  width: 74px;
  height: 30px;
  margin-right: 12px;
  margin-bottom: 6px;
}
.clasify-item .items-ul li:nth-child(3n){
  margin-right: 0;
}
.clasify-item .items-ul li a{
  display: inline-block;
  width: 80px;
  height: 30px;
  padding: 0 5px;
  text-align: center;
  line-height: 28px;
  font-size: 14px;
  text-decoration: none;
  color: #3d3d3d;
  border: 1px solid #737373;
  border-radius: 3px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.clasify-item .items-ul .active a{
  background-color: #5075ce;
  border: 1px solid #5075ce;
  color: #fff;
}
.clasify-btn{
  position: fixed;
  right: 0;
  bottom: 0;
  width: 280px;
  height: 50px;
  z-index: 100;
  background-color: #fff;
}
.clasify-btn > a{
  display: inline-block;
  width: 50%;
  text-align: center;
  height: 50px;
  line-height: 50px;
  color: #3d3d3d;
  font-size: 15px;
  border-top: 1px solid #ababab;
  cursor: pointer;
}
.clasify-btn .submit-btn{
  background-color: #5075ce;
  border-top: 1px solid #5075ce;
  color: #fff;
}
.must label span{
  color: red;
}

</style>
