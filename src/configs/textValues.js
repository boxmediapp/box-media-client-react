import config from "./config";
import localImages from "./localImages";
import {appdata} from "../store";

const textValues={
    title:function(){
        if(appdata.isBeboxClient()){
          return "BeBox Media Application";
        }
        else{
          return "Box Media Application";
        }
    },
    redirect:{
      message:"Loading..."
    },
    episodeList:{
              link:"/box-media/episode-list",
              redirect:"/media-app/index.html?resource=episode",
              linkText:"Episodes",
              actionText:"Episodes",
              icon:localImages.episode
    },
    programmeList:{
          link:"/box-media/programme-list",
          redirect:"/media-app/index.html?resource=programmes",
          linkText:"Programme",
          actionText:"Programme",
          icon:localImages.programme
    },
    collectionList:{
          link:"/box-media/collection-list",
          redirect:"/media-app/index.html?resource=collections",
          linkText:"Collections",
          actionText:"Collections",
          icon:localImages.collection
    },
    s3:{
          link:"/box-media/s3-file-list",
          linkText:"S3",
          actionText:"Videos in S3",
          icon:localImages.s3
    },
    schedules:{
          link:"/box-media/schedule-list",
          redirect:"/media-app/index.html?resource=schedules",
          linkText:"Schedules",
          actionText:"Schedule View",
          icon:localImages.schedules
    },
    playLists:{
          link:"/box-media/playlists",
          redirect:"/media-app/index.html?resource=playlists",
          linkText:"Playlists",
          actionText:"Playlists",
          icon:localImages.playlist
    },
    manageUser:{
        linkText:"Users Manager",
        actionText:"Manage Users",
        link:"/box-media/userManager",
        icon:localImages.userManager
    },

    importSchedules:{
          link:"/box-media/importSchedules",
          linkText:"Imports",
          actionText:"Import Schedules",
          scheduledtasks:{
            title:"Scheduled Tasks"
          },
          icon:localImages.importSchedules
    },

    editEpisode:{
      applink:function(episodeid){
                return "/media-app/index.html?resource=editEpisode&episodeid="+episodeid;
            }
    },






    admin:{
          link:"/box-media/admin",
          linkText:"Admin"
    },
    help:{
          link:"/box-media/help",
          redirect:"/media-app/index.html?resource=help",
          linkText:"Help"
    },

    logout:{
      link:"/box-media-app/logout",
      linkText:"Sign out"
    },

    appConfig:{
        linkText:"App Config",
        actionText:"Application Configuration",
        link:"/box-media/appConfig",
        icon:localImages.appSettings,
        recordLimit:{
            label:"Number of records per batch",
            help:"This is for only for system adminstration. Number of records per batch retrieve from the database, the rest will be fetch on the end of scroll."
        },
        visibilityCategory:{
          label:"Visibility categories",
          help:"This field is the category of the application instance. It can be used to customise the application"
        },
        autoYearsAvailability:{
          label:"No. Years availability",
          help:"You can specify the number of years to set the availability window for the newly created episode. This is for auto creation of availability window. "
        },
        autoSetGeoAllowedCountries:{
          label:"Auto Set allowed countries",
          help:"You can specify the allowed countries to be automatically set for the newly created episode."
        },
        autoSetContentType:{
          label:"Auto Set Content Type",
          help: "You can specify the ContentType to be automatically set for the newly created episode."
        },
        autoSetTxChannel:{
          label:"Auto Set TxChannel",
          help: "You can specify the TxChannel to be automatically set for the newly created episode."
        },
        autoSetPublishedStatus:{
          label:"Auto Set PublishedStatus",
          help: "You can specify the Published Status in this field to be automatically set for the newly created episode"
        },
        autoCreatePlaceHolder:{
          label:"Auto Create Place holder",
          help: "If this fied is true, the place holder is created immediately on creating the episode.",
          options:[{value:"false",label:"Do not create"},{value:"true",label:"Create"}]
        },
        brightcoveStatus:{
          label:"Update brightcove",
          help: "When it is Auto, changes will be pushed to the Brightcove on changes. When it is manual, the records will be marked NEEDS_PUSH_CHANGES_TO_BRIGHTCOVE and you can do batch or selective manual update.",
          options:[{value:"false",label:"Manual"},{value:"true",label:"Auto"}]
        },
        publishProgrammeInfo:{
          label:"Specify whether publish programme info",
          help: "If this fied is true, the programme title and programme synopsis will be published to the brightcove, if not it will be be published.",
          options:[{value:"false",label:"Do not publish programme information"},{value:"true",label:"Publish programme information"}]
        },
        autoTranscode:{
          label:"Auto Transcode video file",
          help: " If this fied is true, the video will be automatically ingested into brightcove for transcode and delivery when a video is received in the s3 bucket.",
          options:[{value:"false",label:"Do not auto transcode"},{value:"true",label:"Auto transcode"}]
        },
        imagetemplateurl:{
          label:"Image Template URL",
          help: "This is the URL template for retrieving different size of images.",
        },
        convertImage:{
          label:"Create Images",
          help: "  When 'Created' is selected, the system will automatically create different sizes of images when an master image is updated to the s3 bucket. And also when the master image is deleted, the generated images will also be deleted.	",
          options:[{value:"false",label:"Do not create"},{value:"true",label:"Create"}]
        },
        sendUpdateToSoundMouse:{
          label:"Send Update to Soundmouse",
          help: "If this fied is true, whenever an episode is created or updated, the changes will be sent to the Soundmouse",
          options:[{value:"false",label:"Do not send"},{value:"true",label:"Send"}]
        },
        s3videoURL:{
          label:"S3 video URL base",
          help: "This is the URL base for the video files."
        },
        awsRegion:{
          label:"AWS region",
          help: "The AWS region for s3 bucket etc."
        },
        videoBucket:{
          label:"S3 video bucket",
          help: "The s3 bucket for storing the video files"
        },
        imageBucket:{
          label:"S3 image bucket",
          help: "The s3 bucket for storing the image files"
        },
        imageMasterFolder:{
          label:"master image folder",
          help: "The folder for storing the master images in the s3 bucket"
        },
        imagePublicFolder:{
          label:"public image folder",
          help: "The folder for storing the public images in the s3 bucket, the images in this folder will be generated from the master images"
        },
        s3imagesURL:{
          label:"S3 image URL base",
          help: "This is the s3 URL base for the image files."
        },
        imageUrlAliases:{
          label:"S3 Image URL aliases",
          help: "This is the comma separated domain name set in the image Cloud Front (CDN) as Alternate Domain Names. This is used for decide whether Image URL is pointing the image s3 bucket or not. This is useful when deciding whether need to import an Image from brightcove",
        },
        requiredFields:{
          label:"Requred fields",
          help: "The comma separated value to specify the fields that are required in order to activate an episode. for example, episode.title, episode.txChannel"
        },
        transcodeSourceBucket:{
          label:"Transcode  source bucket",
          help: "This is the watch bucket, where source video file is dropped for transcode process. transcode process is necessary when the ingest file needs to be pre-processed before ingesting into the brightcove"
        },
        transcodeDestBucket:{
          label:"Transcode dest bucket",
          help: "This is the destination bucket for output of the transcode process. this can be the bucket where the brightcove can pickup the video for ingesting."
        },
        transcodeDestFileNamePrefix:{
          label:"Transcode dest file name prefix",
          help: "This is the file name prefix used for prefxing the transcoded files, this can be used spcified the output folder. For example, if the file received as the input the transcode does not contaons 'V_' prefix, it can be added as file name prefix here"
        }
    },
    appReports:{
      linkText:"Reports",
      actionText:"Reports",
      link:"/box-media/reports",
      numberOfEpisodes:{
          label:"Number Of Episodes"
      },
      numberOfHoursTotal:{
          label:"Total video hours"
      },
      numberOfHoursActive:{
          label:"Total video hours in active"
      },
      icon:localImages.reports
    },
    manageTags:{
      linkText:"Available Tags",
      actionText:"Manage Tags",
      link:"/box-media/tags",
      icon:localImages.manageTags,
      addNewTag:{
            label:"New tag to ad",
            help:"Type the tag here and click add button"
      }
    },
    manageDevices:{
      linkText:"Available Devices",
      actionText:"Manage Devices",
      link:"/box-media/devices",
      icon:localImages.manageDevices,
      addNewDevice:{
            label:"New device to ad",
            help:"Type the device name here and click add button"
      }
    },
    manageAdvertRules:{
              linkText:"Ad Settings",
              actionText:"Advertisements",
              link:"/box-media/adverisement",
              icon:localImages.advertisement,
              edit:{
                  title:"Edit Advert Rule Item",
                  buttonText:"Update"
              },
              add:{
                  title:"Create New Advert Rule Item",
                  buttonText:"Create"
              },
              defaultValues:{
                        id:"",
                        advertBreakType:"POSRROLL",
                        numberOfAdsPerBreak:"1",
                        advertLength:"10",
                        contentType:"Entertainment",
                        contentMinimumDuration:"1800",
                        contentMaximumDuration:""
              },
              advertBreakType:{
                  label:"Matching break types",
                  help: "This field specifies where the advert rule should be applied:pre-roll, mid-roll or post-roll?",
                  options:[{value:"ALL",label:"Apply to all breaks"},{value:"PREPROLL",label:"Apply to Preroll"},{value:"MIDROLL",label:"Apply to Midroll"},{value:"POSRROLL",label:"Apply to Postroll"}]
              },
              numberOfAdsPerBreak:{
                label:"Number of adverts per break",
                help: "This field specifies how many number of adverts should be served per break?"
              },
              advertLength:{
                        label:"Preferred duration for each advert",
                        help: "This field specifies the preferred duration for each advert, this value may be passed to the advertisement vendor.?",
                        options:[{value:"",label:"Not specified"},
                                {value:"5",label:"5 seconds"},
                                {value:"10",label:"10 seconds"},
                                {value:"15",label:"15 seconds"},
                                {value:"20",label:"20 seconds"},
                                {value:"25",label:"25 seconds"},
                                {value:"30",label:"30 seconds"}]
                },
              contentType:{
                label:"Matching Content Type",
                help: "This field specifies matching content type to specify the episodes to which the advert rule should apply",
                options:[{value:"",label:"Not specified"},
                        {value:"ALL",label:"Match all contents"},
                        {value:"Entertainment",label:"Entertainment"},
                        {value:"Music & Charts",label:"Music & Charts"},
                        {value:"Shorts",label:"Shorts"}]
               },
               contentMinimumDuration:{
                 label:"Matching content with minimum duration",
                 help: "This field specifies minimum length of the video that the episode should match in order to apply the advert rule",
               },
               contentMaximumDuration:{
                 label:"Matching content with maximum duration",
                 help: "This field specifies maximum length of the video that the episode should match in order to apply the advert rule",
               }
     },
    home:{
        link:"/",
        link2:"/index.html",
        linkText:"Home"
    },

    logout:{
      link:"/",
      linkText:"Sign out"
    },
    signup:{
       link:"/box-media/sign-up",
       linkText:"Create Account",
       error:{
         title:"Error",
         firstName:"The first name is a required field",
         lastName:"The last name is a required field",
         email:"The email is a required field",
         password:{
             missing:"The password is a required field",
             tooshort:"The password should be at least 6 characters inn length"
         },
         company:"The company field is a required field",
       },
       welcome:{
            title:"Welcome to the Box Media Application",
            content:["You can now sign in using your email address as your user name and the password you have specified. Please click",
              "here",
              " to continue"
            ]

       }
    },


    account:{
      link: "/box-media/account",
      linkText:"Account",
      actionText:"Account",
      icon:localImages.account,
      originalPasswordVerify:{
           title:"User Verification",
           verification:{
                 error:"The password verification failed"
           }
      },
      selectDataToModify:{
          title:"Select Data to Modify",
          firstName:{
              label:"First Name"
          },
          lastName:{
              label:"Last Name"
          },
          email:{
              label:"Email"
          },
          password:{
              label:"Change Password"
          },
          company:{
              label:"Company"
          },
      },
      modifyFirstName:{
            title:"Update First Name",
            error:"Failed to update the first name",
            placeHolder:"First Name",
            label:"First Name"
      },
      modifyLastName:{
            title:"Update Last Name",
            error:"Failed to update the last name",
            placeHolder:"Last Name",
            label:"Last Name"
      },
      modifyEmail:{
            title:"Update Email",
            error:"Failed to update the email",
            placeHolder:"Email",
            label:"Email"
      },
      modifyPassword:{
            title:"Change Password",
            error:"Failed to change password",
            placeHolder:"Password",
            label:"New Passsword"
      },
      modifyCompany:{
            title:"Modifying Company",
            error:"Failed to update the company",
            placeHolder:"Company",
            label:"Company"
      },
    },

    episodeCuePointView:{
        link:"/box-media/video-cues",
        linkText:"Video Cue Points"
    },
    imageManager:{
          link:"/box-media/image-manager",
          linkText:"Upload Image"
    },
    redirectToOldVersion:{
        link:"/box-media/redirect-old-version",
        redirect:"/media-app/index.html"
    },

    uploadHDImageText:["Drop an image here", "Prefers 1920 x 1080"],
    cms:{
          menuService:{
              link:"/box-media/cms/menus",
              linkText:"CMS Menu",
              actionText:"CMS Menu",
              icon:localImages.cmsMenu,
              error:{
                title:"Error in CMS Menu Service",
                missingTitle:"Title is required",
                missingPlaylists:"You need add at least one playlists"
              },
              addPlayList:{
                  title:"Adding PlayList",
                  content:"Select the playlist to add",
                  confirmButton:{label:"ADD"},
                  cancelButton:{label:"CANCEL"}
              }
          }

    }

  };


export default textValues;
