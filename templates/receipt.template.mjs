const schema = {
	amount: {
		type: "number",
	},
	total: {
		type: "number",
	},
	gst: {
		type: "number",
	},
	date: {
		type: "string",
	},
	company: {
		type: "string",
	},
	receipt: {
		type: "string",
	},
	payment: {
		type: "string",
	},
	contact: {
		type: "string",
	},
	email: {
		type: "string",
	},
    gst_number: {
        type: "string",
    }
};

const template = (config) => {
	return `<!doctype html>
    <html ⚡4email data-css-strict>
    
    <head>
      <meta charset="utf-8">
      <meta name="x-apple-disable-message-reformatting">
      <style amp4email-boilerplate>
        body {
          visibility: hidden
        }
      </style>
    
      <script async src="https://cdn.ampproject.org/v0.js"></script>
    
    
      <style amp-custom>
        table,
        td {
          color: #000000;
        }
        
        a {
          color: #0000ee;
          text-decoration: underline;
        }
        
        @media (max-width: 480px) {
          #u_content_image_1 .v-container-padding-padding {
            padding: 10px;
          }
          #u_content_image_1 .v-src-width {
            width: auto;
          }
          #u_content_image_1 .v-src-max-width {
            max-width: 30%;
          }
          #u_content_text_6 .v-container-padding-padding {
            padding: 10px;
          }
          #u_content_text_6 .v-text-align {
            text-align: center;
          }
          #u_content_text_15 .v-container-padding-padding {
            padding: 10px 10px 0px;
          }
          #u_content_text_15 .v-text-align {
            text-align: center;
          }
          #u_content_text_16 .v-container-padding-padding {
            padding: 0px 10px 10px;
          }
          #u_content_text_16 .v-text-align {
            text-align: center;
          }
          #u_content_text_26 .v-container-padding-padding {
            padding: 10px 10px 0px;
          }
          #u_content_text_26 .v-text-align {
            text-align: center;
          }
          #u_content_text_27 .v-container-padding-padding {
            padding: 0px 10px 10px;
          }
          #u_content_text_27 .v-text-align {
            text-align: center;
          }
          #u_content_text_17 .v-container-padding-padding {
            padding: 10px 10px 0px;
          }
          #u_content_text_17 .v-text-align {
            text-align: center;
          }
          #u_content_text_18 .v-container-padding-padding {
            padding: 0px 10px 10px;
          }
          #u_content_text_18 .v-text-align {
            text-align: center;
          }
          #u_content_text_21 .v-container-padding-padding {
            padding: 20px;
          }
          #u_content_text_21 .v-text-align {
            text-align: center;
          }
          #u_content_text_22 .v-container-padding-padding {
            padding: 20px;
          }
          #u_content_text_22 .v-text-align {
            text-align: center;
          }
        }
        
        .u-row {
          display: flex;
          flex-wrap: nowrap;
          margin-left: 0;
          margin-right: 0;
        }
        
        .u-row .u-col {
          position: relative;
          width: 100%;
          padding-right: 0;
          padding-left: 0;
        }
        
        .u-row .u-col.u-col-33p33 {
          flex: 0 0 33.33%;
          max-width: 33.33%;
        }
        
        .u-row .u-col.u-col-50 {
          flex: 0 0 50%;
          max-width: 50%;
        }
        
        .u-row .u-col.u-col-100 {
          flex: 0 0 100%;
          max-width: 100%;
        }
        
        @media (max-width: 767px) {
          .u-row:not(.no-stack) {
            flex-wrap: wrap;
          }
          .u-row:not(.no-stack) .u-col {
            flex: 0 0 100%;
            max-width: 100%;
          }
        }
        
        body {
          margin: 0;
          padding: 0;
        }
        
        table,
        tr,
        td {
          vertical-align: top;
          border-collapse: collapse;
        }
        
        p {
          margin: 0;
        }
        
        .ie-container table,
        .mso-container table {
          table-layout: fixed;
        }
        
        * {
          line-height: inherit;
        }
      </style>
    
    
    </head>
    
    <body class="clean-body u_body" style="margin: 0;padding: 0;color: #000000">
      <!--[if IE]><div class="ie-container"><![endif]-->
      <!--[if mso]><div class="mso-container"><![endif]-->
      <table style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: transparent;width:100%" cellpadding="0" cellspacing="0">
        <tbody>
          <tr style="vertical-align: top">
            <td style="word-break: break-word;border-collapse: collapse;vertical-align: top">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: transparent;"><![endif]-->
    
              <div style="padding: 0px;">
                <div style="max-width: 600px;margin: 0 auto;background-color: #5f5ec8;">
                  <div class="u-row">
    
                    <div class="u-col u-col-100">
                      <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
    
                        <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:5px;font-family:arial,helvetica,sans-serif;" align="left">
                                <div style="text-align:center;line-height:0">
                                  <div style="border-top-width:1px;border-top-style:solid;border-top-color:#BBBBBB;width:0%;display:inline-block;line-height:1px;height:0px;vertical-align:middle"> </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
    
                      </div>
                    </div>
    
                  </div>
                </div>
              </div>
    
              <div style="padding: 0px;">
                <div style="max-width: 600px;margin: 0 auto;background-color: #ffffff;">
                  <div class="u-row">
    
                    <div class="u-col u-col-33p33">
                      <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;">
    
                        <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                                <div style="text-align:center;line-height:0">
                                  <div style="border-top-width:1px;border-top-style:solid;border-top-color:#ffffff;width:100%;display:inline-block;line-height:1px;height:0px;vertical-align:middle"> </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
    
                      </div>
                    </div>
    
                    <div class="u-col u-col-33p33">
                      <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;">
    
                        <table id="u_content_image_1" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:15px;font-family:arial,helvetica,sans-serif;" align="left">
    
                                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                  <tr>
                                    <td style="padding-right: 0px;padding-left: 0px;" align="center">
    
                                    <img alt="Logo" title="Logo" style="display:block" width="128" height="128" src="https://res.cloudinary.com/braincity/image/upload/v1645263117/Orkait%20Solutions/Asset_7_lmzzsy.png" />    
                                      </img>
                                    </td>
                                  </tr>
                                </table>
    
                              </td>
                            </tr>
                          </tbody>
                        </table>
    
                      </div>
                    </div>
    
                    <div class="u-col u-col-33p33">
                      <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;">
    
                        <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                                <div style="text-align:center;line-height:0">
                                  <div style="border-top-width:1px;border-top-style:solid;border-top-color:#ffffff;width:100%;display:inline-block;line-height:1px;height:0px;vertical-align:middle"> </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
    
                      </div>
                    </div>
    
                  </div>
                </div>
              </div>
    
              <div style="padding: 0px;">
                <div style="max-width: 600px;margin: 0 auto;">
                  <div class="u-row">
    
                    <div class="u-col u-col-100">
                      <div style="padding: 0px;background-color:#ffffff;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;">
    
                        <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
    
                                <div class="v-text-align" style="line-height: 140%; text-align: center; word-wrap: break-word;">
                                  <p style="font-size: 14px; line-height: 140%; text-align: center;"><span style="font-size: 18px; line-height: 25.2px;"><strong>Receipt from ${
										config.company
									}</strong></span></p>
                                  <p style="font-size: 14px; line-height: 140%; text-align: center;">Receipt #${
										config.receipt
									}</p>
                                </div>
    
                              </td>
                            </tr>
                          </tbody>
                        </table>
    
                      </div>
                    </div>
    
                  </div>
                </div>
              </div>
    
              <div style="padding: 0px;">
                <div style="max-width: 600px;margin: 0 auto;background-color: #ffffff;">
                  <div class="u-row">
    
                    <div class="u-col u-col-33p33">
                      <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;">
    
                        <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
    
                                <div class="v-text-align" style="line-height: 140%; text-align: center; word-wrap: break-word;">
                                  <p style="font-size: 14px; line-height: 140%;">Amount Paid</p>
                                  <p style="font-size: 14px; line-height: 140%;">${
										config.total
									}₹</p>
                                </div>
    
                              </td>
                            </tr>
                          </tbody>
                        </table>
    
                      </div>
                    </div>
    
                    <div class="u-col u-col-33p33">
                      <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;">
    
                        <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
    
                                <div class="v-text-align" style="line-height: 140%; text-align: center; word-wrap: break-word;">
                                  <p style="font-size: 14px; line-height: 140%;">Date Paid</p>
                                  <p style="font-size: 14px; line-height: 140%;">${
										config.date ||
										Date.now().toLocaleString()
									}</p>
                                </div>
    
                              </td>
                            </tr>
                          </tbody>
                        </table>
    
                      </div>
                    </div>
    
                    <div class="u-col u-col-33p33">
                      <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;">
    
                        <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
    
                                <div class="v-text-align" style="line-height: 140%; text-align: center; word-wrap: break-word;">
                                  <p style="font-size: 14px; line-height: 140%;">Payment Method</p>
                                  <p style="font-size: 14px; line-height: 140%;">${
										config.payment
									}</p>
                                </div>
    
                              </td>
                            </tr>
                          </tbody>
                        </table>
    
                      </div>
                    </div>
    
                  </div>
                </div>
              </div>
    
              <div style="padding: 0px;">
                <div style="max-width: 600px;margin: 0 auto;background-color: #ffffff;">
                  <div class="u-row">
    
                    <div class="u-col u-col-100">
                      <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;">
    
                        <table id="u_content_text_6" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:20px 20px 20px 60px;font-family:arial,helvetica,sans-serif;" align="left">
    
                                <div class="v-text-align" style="line-height: 140%; text-align: left; word-wrap: break-word;">
                                  <p style="font-size: 14px; line-height: 140%;"><span style="font-size: 14px; line-height: 19.6px;"><strong><span style="line-height: 19.6px; font-size: 14px;">SUMMARY</span></strong>
                                    </span>
                                  </p>
                                </div>
    
                              </td>
                            </tr>
                          </tbody>
                        </table>
    
                      </div>
                    </div>
    
                  </div>
                </div>
              </div>
    
              <div style="padding: 0px;">
                <div style="max-width: 600px;margin: 0 auto;background-color: #ffffff;">
                  <div class="u-row">
    
                    <div class="u-col u-col-50">
                      <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;">
    
                        <table id="u_content_text_15" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 10px 60px;font-family:arial,helvetica,sans-serif;" align="left">
    
                                <div class="v-text-align" style="line-height: 140%; text-align: left; word-wrap: break-word;">
                                  <p style="font-size: 14px; line-height: 140%;">Payment to Orkait Solutions</p>
                                </div>
    
                              </td>
                            </tr>
                          </tbody>
                        </table>
    
                      </div>
                    </div>
    
                    <div class="u-col u-col-50">
                      <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;">
    
                        <table id="u_content_text_16" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 60px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
    
                                <div class="v-text-align" style="line-height: 140%; text-align: right; word-wrap: break-word;">
                                  <p style="font-size: 14px; line-height: 140%;">${
										config.amount
									}₹</p>
                                </div>
    
                              </td>
                            </tr>
                          </tbody>
                        </table>
    
                      </div>
                    </div>
    
                  </div>
                </div>
              </div>
    
              <div style="padding: 0px;">
                <div style="max-width: 600px;margin: 0 auto;background-color: #ffffff;">
                  <div class="u-row">
    
                    <div class="u-col u-col-50">
                      <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;">
    
                        <table id="u_content_text_26" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 10px 60px;font-family:arial,helvetica,sans-serif;" align="left">
    
                                <div class="v-text-align" style="line-height: 140%; text-align: left; word-wrap: break-word;">
                                  <p style="font-size: 14px; line-height: 140%;">GST 18%</p>
                                </div>
    
                              </td>
                            </tr>
                          </tbody>
                        </table>
    
                      </div>
                    </div>
    
                    <div class="u-col u-col-50">
                      <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;">
    
                        <table id="u_content_text_27" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 60px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
    
                                <div class="v-text-align" style="line-height: 140%; text-align: right; word-wrap: break-word;">
                                  <p style="font-size: 14px; line-height: 140%;">${
										config.gst
									}₹</p>
                                </div>
    
                              </td>
                            </tr>
                          </tbody>
                        </table>
    
                      </div>
                    </div>
    
                  </div>
                </div>
              </div>
    
              <div style="padding: 0px;">
                <div style="max-width: 600px;margin: 0 auto;background-color: #ffffff;">
                  <div class="u-row">
    
                    <div class="u-col u-col-50">
                      <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;">
    
                        <table id="u_content_text_17" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 10px 60px;font-family:arial,helvetica,sans-serif;" align="left">
    
                                <div class="v-text-align" style="line-height: 140%; text-align: left; word-wrap: break-word;">
                                  <p style="font-size: 14px; line-height: 140%;"><strong>Amount Paid</strong></p>
                                </div>
    
                              </td>
                            </tr>
                          </tbody>
                        </table>
    
                      </div>
                    </div>
    
                    <div class="u-col u-col-50">
                      <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;">
    
                        <table id="u_content_text_18" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 60px 10px 10px;font-family:arial,helvetica,sans-serif;" align="left">
    
                                <div class="v-text-align" style="line-height: 140%; text-align: right; word-wrap: break-word;">
                                  <p style="font-size: 14px; line-height: 140%;"><strong>${
										config.total
									}₹</strong></p>
                                </div>
    
                              </td>
                            </tr>
                          </tbody>
                        </table>
    
                      </div>
                    </div>
    
                  </div>
                </div>
              </div>
    
              <div style="padding: 0px;">
                <div style="max-width: 600px;margin: 0 auto;background-color: #ffffff;">
                  <div class="u-row">
    
                    <div class="u-col u-col-100">
                      <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;">
    
                        <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                                <div style="text-align:center;line-height:0">
                                  <div style="border-top-width:1px;border-top-style:solid;border-top-color:#ecf0f1;width:83%;display:inline-block;line-height:1px;height:0px;vertical-align:middle"> </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
    
                        <table id="u_content_text_21" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 60px;font-family:arial,helvetica,sans-serif;" align="left">
    
                                <div class="v-text-align" style="line-height: 140%; text-align: left; word-wrap: break-word;">
                                  <p style="font-size: 14px; line-height: 140%;"><span style="color: #ced4d9; font-size: 14px; line-height: 19.6px;">if you have any questions, kindly contact us at <a rel="noopener" href="mailto:orkaitsolutions@gmail.com" target="_blank" style="color: #ced4d9;">${
										config.email
									}</a> or call at ${
		config.contact
	}</span></p>
                                </div>
    
                              </td>
                            </tr>
                          </tbody>
                        </table>
    
                        <table id="u_content_text_22" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px 60px;font-family:arial,helvetica,sans-serif;" align="left">
    
                                <div class="v-text-align" style="line-height: 140%; text-align: left; word-wrap: break-word;">
                                  <p style="font-size: 14px; line-height: 140%;"><span style="color: #ced4d9; font-size: 14px; line-height: 19.6px;">You're receiving this email because you made a purchase at Orkait Solutions,</span></p>
                                  <p style="font-size: 14px; line-height: 140%;"><span style="color: #ced4d9; font-size: 14px; line-height: 19.6px;">Kurla west, Mumbai 400072</span></p>
                                </div>
    
                              </td>
                            </tr>
                          </tbody>
                        </table>

                        <table id="u_content_text_28" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                        <tbody>
                          <tr>
                            <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:5px 60px;font-family:arial,helvetica,sans-serif;" align="left">

                              <div class="v-text-align" style="line-height: 140%; text-align: left; word-wrap: break-word;">
                                <p style="font-size: 14px; line-height: 140%; text-align: center;"><span style="color: #ced4d9;">GSTIN - ${config.gst_number}</span></p>
                              </div>

                            </td>
                          </tr>
                        </tbody>
                      </table>
    
                      </div>
                    </div>
    
                  </div>
                </div>
              </div>
    
              <div style="padding: 0px;">
                <div style="max-width: 600px;margin: 0 auto;background-color: #ffffff;">
                  <div class="u-row">
    
                    <div class="u-col u-col-100">
                      <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;">
    
                        <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                                <div style="text-align:center;line-height:0">
                                  <div style="border-top-width:1px;border-top-style:solid;border-top-color:#ecf0f1;width:83%;display:inline-block;line-height:1px;height:0px;vertical-align:middle"> </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
    
                        <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
                                <div style="text-align:center;line-height:0">
                                  <div style="border-top-width:1px;border-top-style:solid;border-top-color:#BBBBBB;width:0%;display:inline-block;line-height:1px;height:0px;vertical-align:middle"> </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
    
                      </div>
                    </div>
    
                  </div>
                </div>
              </div>
    
              <div style="padding: 0px;">
                <div style="max-width: 600px;margin: 0 auto;background-color: #5f5ec8;">
                  <div class="u-row">
    
                    <div class="u-col u-col-100">
                      <div style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
    
                        <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                          <tbody>
                            <tr>
                              <td class="v-container-padding-padding" style="overflow-wrap:break-word;word-break:break-word;padding:5px;font-family:arial,helvetica,sans-serif;" align="left">
                                <div style="text-align:center;line-height:0">
                                  <div style="border-top-width:1px;border-top-style:solid;border-top-color:#BBBBBB;width:0%;display:inline-block;line-height:1px;height:0px;vertical-align:middle"> </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
    
                      </div>
                    </div>
    
                  </div>
                </div>
              </div>
    
              <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
      <!--[if mso]></div><![endif]-->
      <!--[if IE]></div><![endif]-->
    </body>
    
    </html>`;
};

const toExport = {
	schema: schema,
	template: template,
	conditions: {},
};

export default toExport;
