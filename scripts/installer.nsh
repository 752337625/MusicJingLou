#installer.nsh

!macro customInit
  # 修改默认安装路径
  StrCpy $INSTDIR "$LocalAppData\Programs\${APP_FILENAME}"
!macroend


!macro customInstall
  WriteRegStr HKCR "epis_auto_file\shell\open\command" "" '"$INSTDIR\${PRODUCT_NAME}.exe" "%1"'
  WriteRegStr HKCR "epis_auto_file\DefaultIcon" "" '$INSTDIR\${PRODUCT_NAME}.exe,0'
!macroend

!macro customUnInstall
  DeleteRegKey HKCR "epis_auto_file"
!macroend
