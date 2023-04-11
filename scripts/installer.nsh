#installer.nsh

!macro customInit
    # 修改默认安装路径
    StrCpy $INSTDIR "$LocalAppData\Programs\${APP_FILENAME}"
!macroend

