using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(AbcUEM.Startup))]
namespace AbcUEM
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
