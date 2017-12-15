const textValues={
    title:"Box Media Application",
    redirect:{
      message:"Loading..."
    },
    episodeList:{
              link:"/box-media/episode-list",
              redirect1:"episode",
              linkText:"Episodes"
    },
    programmeList:{
          link:"/box-media/programme-list",
          redirect:"programmes",
          linkText:"Programme"
    },
    collectionList:{
          link:"/box-media/collection-list",
          redirect:"collections",
          linkText:"Collections"
    },
    s3:{
          link:"/box-media/s3-file-list",
          redirect:"s3",
          linkText:"S3"
    },
    schedules:{
          link:"/box-media/schedule-list",
          redirect:"schedules",
          linkText:"Schedules",
    },
    playLists:{
          link:"/box-media/playlists",
          redirect:"playlists",
          linkText:"Playlists"
    },
    importSchedules:{
          link:"/box-media/importSchedules",
          redirect1:"importSchedules",
          linkText:"Imports",
          scheduledtasks:{
            title:"Scheduled Tasks"
          }
    },
    admin:{
          link:"/box-media/admin",
          redirect1:"admin",
          linkText:"Admin"
    },
    help:{
          link:"/box-media/help",
          redirect:"help",
          linkText:"Help"
    },

    logout:{
      link:"/box-media-app/logout",
      linkText:"Sign out"
    },
    manageUser:{
        linkText:"Users Manager",
        actionText:"Manage Users",
        link:"/box-media/userManager",
    },
    appConfig:{
        linkText:"App Config",
        actionText:"Application Configuration",
        link:"/box-media/appConfig",
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

    home:{
        link:"/",
        link2:"/index.html",
        linkText:"Home"
    },

    logout:{
      link:"/",
      linkText:"Sign out"
    },

  };
export default textValues;
