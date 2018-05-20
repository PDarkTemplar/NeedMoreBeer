using Microsoft.Extensions.Configuration;
using Moq;
using NeedMoreBeer.Domain.Base.Impl;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Xunit;
using FluentAssertions;

namespace NeedMoreBeer.Domain.Tests
{
    public class BreweryDbServiceTest
    {
        [Fact]
        public void NoApiKeyTest()
        {
            var configMock = new Mock<IConfigurationProxy>();
            configMock.Setup(x => x.GetValue<string>("ApiKey")).Returns("");

            var restClientMock = new Mock<IRestClient>();

            var service = new BreweryDbService(configMock.Object, restClientMock.Object);

            Func<Task> f = async () => { await service.GetAsync<string>("test", CancellationToken.None); };
            f.Should().Throw<Exception>().WithMessage("ApiKey is empty, specify one in appsettings.json");
        }

        [Fact]
        public async Task AddKeyTest()
        {
            var configMock = new Mock<IConfigurationProxy>();
            configMock.Setup(x => x.GetValue<string>("ApiKey")).Returns("test");

            IRestRequest request = null;
            var responseMock = new Mock<IRestResponse<string>>();
            responseMock.Setup(x => x.IsSuccessful).Returns(true);
            responseMock.Setup(x => x.Data).Returns("test");

            var restClientMock = new Mock<IRestClient>();
            restClientMock.Setup(x => x.ExecuteGetTaskAsync<string>(It.IsAny<IRestRequest>(), It.IsAny<CancellationToken>())).Callback<IRestRequest, CancellationToken>((restRequest, token) =>
            {
                request = restRequest;
            }).ReturnsAsync(responseMock.Object);

            var service = new BreweryDbService(configMock.Object, restClientMock.Object);

            var result = await service.GetAsync<string>("test", CancellationToken.None);

            request.Parameters.Should().OnlyContain(x => x.Name == "key" && x.Value == "test");
            result.Should().Be("test");
        }

        [Fact]
        public void UnSuccessfulTest()
        {
            var configMock = new Mock<IConfigurationProxy>();
            configMock.Setup(x => x.GetValue<string>("ApiKey")).Returns("test");

            var responseMock = new Mock<IRestResponse<string>>();
            responseMock.Setup(x => x.IsSuccessful).Returns(false);
            responseMock.Setup(x => x.ErrorException).Returns(new Exception("test"));

            var restClientMock = new Mock<IRestClient>();
            restClientMock.Setup(x => x.ExecuteGetTaskAsync<string>(It.IsAny<IRestRequest>(), It.IsAny<CancellationToken>())).ReturnsAsync(responseMock.Object);

            var service = new BreweryDbService(configMock.Object, restClientMock.Object);

            Func<Task> f = async () => { await service.GetAsync<string>("test", CancellationToken.None); };
            f.Should().Throw<Exception>().WithMessage("test");


        }
    }
}
