using AutoFixture;
using FluentAssertions;
using Moq;
using NeedMoreBeer.Domain.Base;
using NeedMoreBeer.Domain.Exceptions;
using NeedMoreBeer.Domain.Model;
using NeedMoreBeer.Domain.Service.Impl;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Xunit;

namespace NeedMoreBeer.Domain.Tests
{
    public class BeerTest
    {
        private Fixture _fixture = new Fixture();

        [Fact]
        public async Task GetDetailsTest()
        {
            var result = _fixture.Create<SingleResponse<Dto.Beer>>();
            result.Status = "success";

            var dbMock = new Mock<IBreweryDbService>();
            dbMock.Setup(x => x.GetAsync<SingleResponse<Dto.Beer>>("beer/1", It.IsAny<CancellationToken>())).ReturnsAsync(result);

            var service = new BeerService(dbMock.Object);

            var serviceResult = await service.GetBeerAsync("1", CancellationToken.None);

            serviceResult.Should().BeEquivalentTo(result.Data);
        }

        [Fact]
        public void GeDetailsUnSuccessfulTest()
        {
            var result = _fixture.Create<SingleResponse<Dto.Beer>>();

            var dbMock = new Mock<IBreweryDbService>();
            dbMock.Setup(x => x.GetAsync<SingleResponse<Dto.Beer>>("beer/1", It.IsAny<CancellationToken>())).ReturnsAsync(result);

            var service = new BeerService(dbMock.Object);

            Func<Task> f = async () => { await service.GetBeerAsync("1", CancellationToken.None); };

            f.Should().Throw<BusinessException>().WithMessage("Something went wrong");
        }

        [Fact]
        public async Task GetTableTest()
        {
            var result = _fixture.Create<ArrayResponse<Dto.TableBeer>>();
            result.Status = "success";

            var dbMock = new Mock<IBreweryDbService>();
            dbMock.Setup(x => x.GetAsync<ArrayResponse<Dto.TableBeer>>("beers", It.IsAny<CancellationToken>(), It.IsAny<KeyValue[]>())).ReturnsAsync(result);

            var service = new BeerService(dbMock.Object);

            var serviceResult = await service.GetTableAsync(new Dto.TableRequest { Filters = new[] { "ibv:10", "", null, "134", "fff" } }, CancellationToken.None);

            serviceResult.NumberOfPages.Should().Be(result.NumberOfPages);
            serviceResult.Data.Should().BeEquivalentTo(result.Data);
        }

        [Fact]
        public void GetTableUnSuccessfulTest()
        {
            var result = _fixture.Create<ArrayResponse<Dto.TableBeer>>();

            var dbMock = new Mock<IBreweryDbService>();
            dbMock.Setup(x => x.GetAsync<ArrayResponse<Dto.TableBeer>>("beers", It.IsAny<CancellationToken>(), It.IsAny<KeyValue[]>())).ReturnsAsync(result);

            var service = new BeerService(dbMock.Object);

            Func<Task> f = async () => { await service.GetTableAsync(new Dto.TableRequest { Filters = new[] { "ibv:10", "", null, "134", "fff" } }, CancellationToken.None); };

            f.Should().Throw<BusinessException>().WithMessage("Something went wrong");
        }
    }
}
